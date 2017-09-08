import React, {Component} from 'react';
import * as apiUtil from '../util/ThewallapiRestUtil';

const getAllData = async function(){
  let gpr1 = await apiUtil.getProductReviews(3036330, 5133);
  let gpa1 = await apiUtil.getProductAvailability(3036330, 5133);
  let gpdp1 = await apiUtil.getPdp(3036330, 5133);

  let gpr2 = await apiUtil.getProductReviews(3430617, 5133);
  let gpa2 = await apiUtil.getProductAvailability(3430617, 5133);
  let gpdp2 = await apiUtil.getPdp(3430617, 5133);

  const jsonobj = [
    {
      reviews: gpr1.reviewResponses,
      availability: gpa1,
      pdp: gpdp1
    },
    {
      reviews: gpr2.reviewResponses,
      availability: gpa2,
      pdp: gpdp2
    }
  ]

  return jsonobj;
  
})();

export { getAllData };
