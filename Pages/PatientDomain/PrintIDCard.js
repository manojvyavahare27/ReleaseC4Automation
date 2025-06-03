class PrintIDCard
{
    constructor(page)
    {
        this.page=page
        this.Icon_PhotocameraIcon=page.getByTestId('PhotoCameraIcon')
        this.btn_Upload=page.getByTestId('Upload')
        this.btn_Save=page.getByTestId('Save')
        this.link_PrintIdCard=page.getByTestId('Print Id Card')
    }
    async clickOnLinkPrintIdCard()
    {
        await this.link_PrintIdCard.click()
    }
    async clickOnSavebtn()
    {
        await this.btn_Save.click()
    }
    async clickOnPhotoCameraIcon()
    {
        await this.Icon_PhotocameraIcon.click()
    }

    async Uploadphoto()
    {
        // Get the upload input element
      const fileInput = await page.$('input[type=file]');  
       // Set the file to upload
      const filePath = '../UploadPics/Patient.png';  
       // Upload the file
      await fileInput.setInputFiles(filePath); 
    }

    async clickOnUploadbtn()
    {
        await this.btn_Upload.click()
    }

}
module.exports=PrintIDCard