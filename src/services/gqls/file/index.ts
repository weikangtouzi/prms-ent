import {gql} from "@apollo/client";

export const UploadFileToServer = gql`
  mutation uploadFile($file: Upload!) {
    CommonSingleUpload(file:$file){
      link
    }
  }
`;

