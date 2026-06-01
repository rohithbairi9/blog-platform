import api from "@/lib/axios";

export const uploadImage = async (
  file: File
) => {
  const formData = new FormData();

  formData.append(
    "image",
    file
  );

  // const response =
  //   await api.post(
  //     "/upload/image",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type":
  //           "multipart/form-data",
  //       },
  //     }
  //   );


  // return response.data;

  const response =
  await api.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

console.log(
  "Upload response:",
  response.data
);

return response.data;
};