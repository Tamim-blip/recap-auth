"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";


const ForgotPassword = () => {



    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries())

    const resData = await requestPasswordReset({
        email : userData.email as string,
        redirectTo : '/reset-password'
    })

    console.log(resData)
    }



    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <p>Enter your email</p>


            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>
     
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
            
        </div>
    );
};

export default ForgotPassword;