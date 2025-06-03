const { default: Environment } = require("./Environment")
//import Environment from '../Pages/Environment';

class LoginPage{
constructor(page)
{
    this.page=page
    this.userName=page.getByRole('textbox', { name: 'Username' })        
    this.passWord=page.getByRole('textbox', { name: 'Password' })
    this.emailaddress=page.locator("xpath=//input[@id='Email Address']")
    this.loginButton=page.getByTestId('Login')
    this.message=page.getByText('Your username/password combination has not been recognised. Please try again.')
    
    //Forgot Password Page
    this.forgotpasswordlink=page.locator("//body/div[@id='root']/div[2]/div[1]/div[1]/div[1]/form[1]/div[1]/div[2]/div[1]/div[5]/a[1]")
    this.forgotpasswordlink=page.getByText('Forgot Password')
    this.closeforgotpasswordpopup=page.getByTestId('CancelIcon')
    this.txtEmailAddress=page.locator("xpath=//input[@id='Email Address']")

    //Login to Rferral Portal
   

    this.txtUserName=page.locator("xpath=//input[@id='Username']")
    this.txtPassword=page.locator("xpath=//input[@id='Password']")
    this.btnLoginReferralPortal=page.locator("xpath=//div[contains(text(),'Login')]")
    

}

async openReferralPortal()
{
    await this.page.goto("http://10.0.0.106:3001/cellmaPortal/portal/login")
}

async enterReferralPortalUserName(username)
{
    await this.txtUserName.fill(username)
}
async enterRefrralPortalPassword(password)
{
    await this.txtPassword.fill(password)
}
async clickOnReferralPortalLoginButton()
{
    await this.btnLoginReferralPortal.click()
}

async openUrl()
{
    await this.page.goto("http://10.0.0.64:3000/cellmaUser/login")   
    //await page.goto(Environment.Test)
}
//enterUsername=async()=> await this.userName.type(username)
//enter_Password=async()=> await this.passWord.type(password)


     async enterUsername(username)
    {
        await this.userName.fill(username)
        if(this.userName!=null)
        {
            return this.userName
        }
        else throw new Error("No Username Element Present")
    }

    async readusername()
    {
        const value= await this.userName.inputValue()
        return value          
        console.log(value)
    }


    async enter_Password(password)
    {
        await this.passWord.type(password)
        if(this.passWord!=null)
        {
            return this.passWord
        }
        else throw new Error("No Password Element Present")
    }
    async clickOnLogin()
    {
        await this.loginButton.click()
        // if(this.loginButton!=null)
        // //if(this.loginButton!=Invisiable)
        // {
        //     return this.loginButton.click()
        // }
        // else throw new Error("No Loginbutton Element Present")
    }

    async enter_emailAddress(emailid)
    {
        await this.txtEmailAddress.type(emailid)
        if(this.txtEmailAddress!=null)
        {
            return this.txtEmailAddress
        }
        else throw new Error("No txtEmailAddress Element Present")
    }

    async enter_InvalidemailAddress(Invalidemailid)
    {
        await this.txtEmailAddress.fill(Invalidemailid)
        // if(this.txtEmailAddress!=null)
        // {
        //     return this.txtEmailAddress
        // }
        // else throw new Error("No txtEmailAddress Element Present")
    }
}
module.exports=LoginPage