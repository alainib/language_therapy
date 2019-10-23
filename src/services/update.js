import { unzip } from "react-native-zip-archive";
import { MainBundlePath, DocumentDirectoryPath } from "react-native-fs";
import * as axios from "axios";
var axiosInstance = axios.create();

const updateUrl = "http://88.190.14.12:1234/static/ressources.zip";

const aaa = "http://88.190.14.12:1234/static/data.js";

export async function dlzip() {
  try {
    /*
    const response = await axiosInstance.get(updateUrl, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/zip"
      }
    });*/

    const response = await axiosInstance.get(aaa);

    status = response.status;
    data = response.data;
    console.log({ response, status, data });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function dezip(sourcePath) {
  console.log("dezip", sourcePath);
  const targetPath = DocumentDirectoryPath;
  /*
  return await unzip(sourcePath, targetPath)
    .then(path => {
      console.log(`unzip completed at ${path}`);
      return path;
    })
    .catch(error => {
      console.warn(error);
    });*/
}

export async function ls(path) {
  console.log("ls", path);
  /* return await RNFetchBlob.fs.ls(path).then(files => {
    console.log("res", files);
    return files;
  });
  try {
    let files = await RNFetchBlob.fs.ls(path);
    return files;
  } catch (error) {
    console.error(error);
    return false;
  }*/
}
