import LogoIcon from '@/components/icons/logo-icon'
import FormItemInput from '@/components/ui/form-item-input'
import FormItemInputPassword from '@/components/ui/form-item-input-password'
import { Form } from 'antd'

export default function Login() {
  return (
    <div className='w-px-400 mx-auto pt-12 pt-lg-0 flex flex-col'>
        <h1 className='mb-1'>Adventure starts here 🚀</h1>
        <p className='mb-5'>Make your app management easy and fun!</p>
      <Form>
        <FormItemInput name="username" inputProps={{placeholder:"User Name"}}/>
        <FormItemInput name="email" inputProps={{placeholder:"Email"}}/>
        <FormItemInputPassword name="password" inputProps={{placeholder:"Password"}}/>
      </Form>
    </div>
  )
}
