
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs'


const updateUrl = "https://www.dropbox.com/s/5b98kn160bfdjea/ressources.zip?dl=1";


export async function dlzip() {

    try {
        let res = await RNFetchBlob.config({ fileCache: true }).fetch('GET', updateUrl);
        console.log('The file saved to ', res.path());
        return res.path();
    } catch (error) {
        console.error(error);
        return false;
    }

}

export async function dezip(sourcePath) {
    const targetPath = DocumentDirectoryPath

    return await unzip(sourcePath, targetPath)
        .then((path) => {
            console.log(`unzip completed at ${path}`)
            return path
        })
        .catch((error) => {
            console.log(error)
        })
}


export async function ls(path) {
    return await RNFetchBlob.fs.ls(path).then((files) => {
        console.log("res", files)
        return files;
    })
    try {
        let files = await RNFetchBlob.fs.ls(path);
        return files;
    } catch (error) {
        console.error(error);
        return false;
    }
}