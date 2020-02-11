package com.leaolabs.ambrosio.business;

import java.util.Optional;
import com.leaolabs.ambrosio.model.ItemExame;

public interface ItemExameBusiness {

	Optional<ItemExame> create(ItemExame exame, Long exameId);
}
