package com.ssafy.gallery.option.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.gallery.common.exception.ApiExceptionFactory;
import com.ssafy.gallery.option.dto.KakaoPayApproveResponse;
import com.ssafy.gallery.option.dto.KakaoPayReadyResponse;
import com.ssafy.gallery.option.dto.OptionListDto;
import com.ssafy.gallery.option.exception.OptionExceptionEnum;
import com.ssafy.gallery.option.model.OptionBuyLog;
import com.ssafy.gallery.option.model.OptionStore;
import com.ssafy.gallery.option.repository.OptionBuyLogRepository;
import com.ssafy.gallery.option.repository.OptionStoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OptionService {
    private final OptionStoreRepository optionStoreRepository;
    private final OptionBuyLogRepository optionBuyLogRepository;

    @Value("${pay.kakao.secret_key}")
    private String secretKey;

    @Cacheable(cacheNames = "optionList", cacheManager = "cacheManager")
    public List<OptionListDto> getList() {
        List<OptionStore> optionStores = optionStoreRepository.findAll();
        return optionStores.stream()
                .map(this::convertToOptionListDto)
                .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = "optionImageUrl", cacheManager = "cacheManager")
    public String getImageUrl(int optionId) {
        Optional<OptionStore> optionStore = optionStoreRepository.findById(optionId);
        return optionStore.map(OptionStore::getOptionS3Url).orElse(null);
    }

    public Optional<OptionStore> getOption(int optionId) {
        return optionStoreRepository.findById(optionId);
    }

    @Cacheable(cacheNames = "buyOption", key = "#userId", condition = "#userId != null", cacheManager = "cacheManager")
    public List<OptionBuyLog> getBuyOptionList(int userId) {
        return optionBuyLogRepository.findAllByUserId(userId);
    }

    @CacheEvict(cacheNames = "buyOption", key = "#userId", cacheManager = "cacheManager")
    public void buyOption(int userId, int optionId) {
        OptionBuyLog optionBuyLog = OptionBuyLog.builder().userId(userId).optionId(optionId).build();
        optionBuyLogRepository.save(optionBuyLog);
    }

    public KakaoPayReadyResponse paymentReady(int userId, String optionName, int optionId, int cost) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
            HttpEntity<?> urlRequest = new HttpEntity<>(mapToJson(getReadyParams(userId, optionName, optionId, cost)), getHeaders());
            return restTemplate.postForObject(url, urlRequest, KakaoPayReadyResponse.class);
        } catch (JsonProcessingException jpe) {
            log.error(jpe.getMessage());
            throw ApiExceptionFactory.fromExceptionEnum(OptionExceptionEnum.JSON_PROCESSING);
        } catch (RestClientException rce) {
            log.error(rce.getMessage());
            throw ApiExceptionFactory.fromExceptionEnum(OptionExceptionEnum.WRONG__PAYMENT_REQUEST);
        }
    }

    public KakaoPayApproveResponse paymentApprove(String tid, String pgToken) {
        try {
            String url = "https://open-api.kakaopay.com/online/v1/payment/approve";
            HttpEntity<?> urlRequest = new HttpEntity<>(mapToJson(getApproveParams(tid, pgToken)), getHeaders());
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.postForObject(url, urlRequest, KakaoPayApproveResponse.class);
        } catch (JsonProcessingException jpe) {
            log.error(jpe.getMessage());
            throw ApiExceptionFactory.fromExceptionEnum(OptionExceptionEnum.JSON_PROCESSING);
        } catch (RestClientException rce) {
            log.error(rce.getMessage());
            throw ApiExceptionFactory.fromExceptionEnum(OptionExceptionEnum.WRONG__PAYMENT_REQUEST);
        }
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", "SECRET_KEY " + secretKey);
        return headers;
    }

    private Map<String, Object> getReadyParams(int userId, String optionName, int optionId, int cost) {
        Map<String, Object> params = new HashMap<>();
        params.put("cid", "TC0ONETIME");
        params.put("partner_order_id", "partner_order_id");
        params.put("partner_user_id", "partner_user_id");
        params.put("item_name", optionName);
        params.put("item_code", optionId);
        params.put("quantity", "1");
        params.put("total_amount", String.valueOf(cost));
        params.put("tax_free_amount", "0");
        params.put("approval_url", "https://j10a101.p.ssafy.io/api/v1/option/payment/success?user_id=" + userId);
        params.put("cancel_url", "https://j10a101.p.ssafy.io/api/v1/option/payment/cancel");
        params.put("fail_url", "https://j10a101.p.ssafy.io/api/v1/option/payment/fail");
        return params;
    }

    private Map<String, Object> getApproveParams(String tid, String pgToken) {
        Map<String, Object> params = new HashMap<>();
        params.put("cid", "TC0ONETIME");
        params.put("tid", tid);
        params.put("partner_order_id", "partner_order_id");
        params.put("partner_user_id", "partner_user_id");
        params.put("pg_token", pgToken);
        return params;
    }

    private String mapToJson(Map<String, Object> map) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(map);
    }

    private OptionListDto convertToOptionListDto(OptionStore optionStore) {
        return new OptionListDto(optionStore);
    }
}
