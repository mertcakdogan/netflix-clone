import axios from 'axios';
import { useCallback, useState } from "react";
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from "@/components/Input";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async() => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: `/`,
      });

      router.push('/');
    }
    catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async() => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
       }
        catch (error) {
          console.log(error);

        }
  }, [email, name, password, login]);

  
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="absolute w-full h-full bg-gradient-to-t from-[#111] to-transparent">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo"  />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Oturum Aç" : "Kayıt Ol"}
            </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
              label="Kullanıcı Adı"
              onChange={(ev: any) => setName(ev.target.value)}
              id="name"
              type="name"
              value={name}
            />
            )}

            
            <Input
              label="E-posta veya telefon numarası"
              onChange={(ev: any) => setEmail(ev.target.value)}
              id="email"
              type="email"
              value={email}
            />
            <Input
            label="Parola" 
            onChange={(ev: any) => setPassword(ev.target.value)}
            id="password"
            type="password"
            value={password}
          />
          </div>
          <button onClick={variant === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"> 
          {variant === "login" ? "Oturum Aç" : "Kayıt Ol"}
          </button>
          <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className='
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              '
              >
              <FcGoogle size={30} />
              </div>
              <div
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className='
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              '
              >
              <FaGithub size={30} />
              </div>
          </div>
          <p className="text-neutral-500 mt-12">
          {variant === "login" ? "Netflix'e katılmak ister misiniz?" : "Zaten bir hesabınız var mı?"}
          <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
          {variant === "login" ? "Kayıt Ol" : "Oturum Aç"}
          </span>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
