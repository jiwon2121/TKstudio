package com.ssafy.gallery.image.repository;

import com.ssafy.gallery.common.exception.ApiExceptionFactory;
import com.ssafy.gallery.common.exception.MariaDBExceptionEnum;
import com.ssafy.gallery.image.model.ImageInfo;

import com.ssafy.gallery.option.model.OptionStore;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Repository
@RequiredArgsConstructor
public class ImageRepository {
    @PersistenceContext
    private EntityManager em;

    private final ImageJpaRepository imageJpaRepository;

    public ImageInfo insertImageUrls(ImageInfo imageInfo, OptionStore optionStore) {
        imageInfo.setOptionStore(optionStore);
        return imageJpaRepository.save(imageInfo);
    }

    public List<ImageInfo> getImageInfoListByUserId(int userId) {
        String jpql = "SELECT i FROM ImageInfo i LEFT JOIN FETCH i.optionStore WHERE i.userId = :userId AND i.isDeleted = false";
        TypedQuery<ImageInfo> query = em.createQuery(jpql, ImageInfo.class);
        query.setParameter("userId", userId);
        List<ImageInfo> list = query.getResultList();
        if (list.isEmpty()) {
            log.info("No ImageInfo records found for userId: " + userId);
        } else {
            ApiExceptionFactory.fromExceptionEnum(MariaDBExceptionEnum.NO_DB_DATA);
        }
        return list;
    }

    public void deleteImageInfo(int imageInfoId) {
        log.info(imageInfoId +" is delete");
        imageJpaRepository.findById(imageInfoId)
                .map(imageInfo -> {
                    imageInfo.markAsDeleted();
                    return imageInfo;
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 이미지 정보가 존재하지 않습니다. imageInfoId=" + imageInfoId));

        imageJpaRepository.flush();
    }

    public ImageInfo getImage(int imageInfoId) {
        log.info(imageInfoId);
        String jpql = "SELECT i FROM ImageInfo i WHERE i.imageInfoId = :imageInfoId AND i.isDeleted = false";
        TypedQuery<ImageInfo> query = em.createQuery(jpql, ImageInfo.class);
        query.setParameter("imageInfoId", imageInfoId);

        List<ImageInfo> resultList = query.getResultList();
        if (!resultList.isEmpty()) {
            return resultList.get(0);
        }
        return null;
    }
}
