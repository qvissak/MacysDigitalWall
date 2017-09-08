const REVIEWS_URL = "http://172.17.0.62:8080/api/reviews?storeLocation={storeLocation}&productId={productId}";
const AVAILABLITY_URL = "http://172.17.0.62:8080/api/availability?storeLocation={storeLocation}&productId={productId}";
const PDP_URL = "http://172.17.0.62:8080/api/pdp?storeLocation={storeLocation}&productId={productId}";
const NEW_ITEM_REQUEST_URL = "http://172.17.0.62:8080/addRequestedItem";
const ALL_DATA_URL = "http://172.17.0.62:8080//api/allData?storeLocation={storeLocation}&productIds={productIds}";

const get = async function (url) {
    return await fetch(url, {

        mode: 'cors'
    }
    ).then((response) => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json();
    });
}

const post = async function (url, formData) {
    return await fetch(url,
        {
            method: "POST",
            body: formData,
            mode: 'cors'

        }).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            return response.json();
        });
}

const getProductReviews = async function (productId, storeLocation) {
    let url = REVIEWS_URL.replace("{productId}", productId).replace("{storeLocation}", storeLocation);
    console.log(url);
    return await get(url);
}

const getProductAvailability = async function (productId, storeLocation) {
    let url = AVAILABLITY_URL.replace("{productId}", productId).replace("{storeLocation}", storeLocation);
    return await get(url);
}

const getPdp = async function (productId, storeLocation) {
    let url = PDP_URL.replace("{productId}", productId).replace("{storeLocation}", storeLocation);
    return await get(url);
}

const postNewItemRequest = async function (departmentId, webId, itemName, itemUpcCode, itemColorId, itemPrice, customerName) {
    let form = new FormData();
    form.append("departmentId", departmentId);
    form.append("webId", webId);
    form.append("itemName", itemName);
    form.append("itemUpcCode", itemUpcCode);
    form.append("itemColorId", itemColorId);
    form.append("itemPrice", itemPrice);
    form.append("customerName", customerName);
    return await post(NEW_ITEM_REQUEST_URL, form);
}

const getAllProductsData = async function (productIds, storeLocation) {
    let url = ALL_DATA_URL.replace("{productIds}", productIds).replace("{storeLocation}", storeLocation);
    return await get(url);
}


export { get, post, getAllProductsData, getProductReviews, getPdp, postNewItemRequest, getProductAvailability };
