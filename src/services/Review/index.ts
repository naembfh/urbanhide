import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";

// Review-related services
export const getReviewsByProductId = async (productId: string) => {
    const res = await clientAxiosInstance.get(`/reviews/show/${productId}`);
    return res.data;
  };
  
  export const addReview = async ({
    productId,
    userId,
    comment,
    rating,
  }: {
    productId: string;
    userId: string;
    comment: string;
    rating: number;
  }) => {
    const res = await clientAxiosInstance.post("/reviews/create", {
      productId,
      userId,
      comment,
      rating,
    });
    return res.data;
  };