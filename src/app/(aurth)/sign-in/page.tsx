"use client";
import { signIn,} from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Eye, EyeSlash} from "@gravity-ui/icons";

import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";


const SignInPage = () => {


     const [isVisible, setIsVisible] = useState(false);


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries())

    const resData = await signIn.email({
       
        email : userData.email as string,
        password : userData.password as string,
        callbackURL : '/'
    })

    console.log(resData)

    }

     const HandleGoogleSignIn = async() =>{
        const data = await signIn.social({
            provider : "google"
        })

        console.log(data)

    }

    return (
         <div className="flex flex-col justify-center items-center mt-10">
            <p className="text-2xl text-blue-600">Please sign in</p>

            <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >

         

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



      <TextField
       className="w-full max-w-100"
        name="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
        >
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-100"
          type={isVisible ? "text" : "password"}
         
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
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
    <p>Forgot password?  <Link className="text-blue-900 underline" href= '/forgot-password'>Click here</Link></p>
    <p>or</p>
    <Button onClick={HandleGoogleSignIn}>Sign in with google</Button>
            
        </div>
    );
};

export default SignInPage;