


export const filesUpload = async ( file )=>{


    //url de cloudinary
    const urlCloud = '	https://api.cloudinary.com/v1_1/cpandares/upload';

    const formData = new FormData();
    formData.append('upload_preset','journal-react');
    formData.append('file',file);

    try {
        
        const resp = await fetch( urlCloud,{
            method:'POST',
            body:formData
        } )

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url
        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw error
    }

}