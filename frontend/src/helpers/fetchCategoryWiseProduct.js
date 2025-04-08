import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category wise product:", error);
        return { data: [] }; // Return empty array or handle error state as needed
    }
};

export default fetchCategoryWiseProduct;
