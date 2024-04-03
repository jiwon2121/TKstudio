package com.ssafy.gallery.option.dto;

import com.ssafy.gallery.option.model.OptionStore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class OptionListDto {
    private int optionId;
    private String optionName;
    private int cost;
    private String gender;
    @Setter
    private boolean purchased;

    public OptionListDto(OptionStore optionStore) {
        this.optionId = optionStore.getOptionId();
        this.optionName = optionStore.getOptionName();
        this.cost = optionStore.getCost();
        this.gender = optionStore.getGender();
    }
}
