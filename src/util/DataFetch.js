import * as apiUtil from "./ThewallapiRestUtil";
import * as mockData from "./mockData";

class DataFetch {

    constructor() {
        this.allProductIdData = [];
        // this.allProductIdData = mockData;
    }

    getProductIdsData = async function (productIds, storeLocation) {
        let response = await apiUtil.getAllProductsData(productIds, storeLocation);
        this.allProductIdData = this.allProductIdData.concat(response);
    }

    getReviewsData(productId) {
        let productData = this.getObjectWithProductId(productId);
        if (productData != null) {
            return productData.reviewsJSON;
        } else return null;
    }

    getPdpData(productId) {
        let productData = this.getObjectWithProductId(productId);
        if (productData != null) {
            return productData.pdpJSON;
        } else return null;
    }

    getPdpDataUpcsPhotos(productId) {
        let productData = this.getObjectWithProductId(productId);
        if (productData != null) {
            var upcList = productData.pdpJSON.upcs;
            var listOfPhotos = [];
            for (var i = 0; i < upcList.length; i++) {
                listOfPhotos.push(upcList[i].primaryImageUrl)
            }
            return listOfPhotos;
        } else return null;
    }

    getPdpDataUpcImageUrl(productId, upcNumber) {
        let productData = this.getObjectWithProductId(productId);
        if (productData != null) {
            var upcList = productData.pdpJSON.upcs;
            for (var i = 0; i < upcList.length; i++) {
                if (upcList[i].upcNumber === upcNumber)
                    return upcList[i].primaryImageUrl
            }
        } else return null;
    }


    getProductAvailabilityData(productId) {
        let productData = this.getObjectWithProductId(productId);
        if (productData != null) {
            return productData.itemAvailabilityJSON;
        } else return null;
    }

    getObjectWithProductId(productId) {
        for (var i = 0; i < this.allProductIdData.length; i++) {
            if (this.allProductIdData[i].productId == productId) {
                return this.allProductIdData[i];
            }
        }
        return null;
    }

    isThereData() {
        return this.allProductIdData.lenth !== 0;
    }

    getPdpWithAvailability(productId) {
        var pdpData = this.getPdpData(productId);
        if (pdpData !== null) {
            for (var i = 0; i < pdpData.upcs.length; i++) {
                var availabilityCount = this.getAvaibilityCountForProductAndUpc(productId, pdpData.upcs[i].upcNumber);
                pdpData.upcs[i].availabilityCount = availabilityCount;
            }
            return pdpData;
        } else return null;
    }

    getAvaibilityCountForProductAndUpc(productId, upcNumber) {
        var availabilityData = this.getProductAvailabilityData(productId);
        for (var i = 0; i < availabilityData.upcs.length; i++) {
            if (upcNumber === availabilityData.upcs[i].upcNumber) {
                return availabilityData.upcs[i].availabilityCount;
            }
        }//assume if we dont have the upc code, availability count is 0
        return 0;
    }
    getOnlineActiveStatusForProductAndUpc(productId, upcNumber) {
        var availabilityData = this.getProductAvailabilityData(productId);
        for (var i = 0; i < availabilityData.upcs.length; i++) {
            if (upcNumber === availabilityData.upcs[i].upcNumber) {
                return availabilityData.upcs[i].onlineActive;
            }
        }//assume if we dont have the upc code, availability count is 0
        return 0;
    }

    getUpcItemDataEasyUsage(productId, upcNumber) {
        var itemPDPData = this.getPdpWithAvailability(productId);
        for (var i = 0; i < itemPDPData.upcs.length; i++) {
            if (itemPDPData.upcs[i].upcNumber === upcNumber) {
                var itemName = itemPDPData.name.split(",")[0];
                var wantedUpcData = itemPDPData.upcs[i];
                var regularPrice = wantedUpcData.prices === null ? "No price available" : wantedUpcData.prices[0].value ? wantedUpcData.prices[0].value : "No price available";
                var salePrice = wantedUpcData.prices === null ? "No sale price available" : wantedUpcData.prices[1].value ? wantedUpcData.prices[1].value : "No sale price available";
                var availability = wantedUpcData.availabilityCount;
                var colorName = wantedUpcData.color.name;
                var colorURL = wantedUpcData.swatchImageUrl;
                var upcData = {
                    itemName : itemName,
                    productId: productId,
                    salePrice: salePrice,
                    regularPrice: regularPrice,
                    availability: availability,
                    colorName: colorName,
                    colorURL: colorURL
                }
                return upcData;
            }
        }
        return null;
    }
    //a good upc number is one that has a valid price associated with it
    getFirstGoodUpcNumber(productId) {
        var pdpData = this.getPdpData(productId)
        for (var i = 0; i < pdpData.upcs.length; i++) {
            if (pdpData.upcs[i].prices !== null) {
                return pdpData.upcs[i].upcNumber;
            }
        }
        console.log("are no good upcs Numbers: " + productId)
        return null;
    }
}

export default (new DataFetch());
