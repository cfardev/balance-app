import Router from 'next/router'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '../context/auth'
import ilustration from '../assets/loginIlustration.svg'
import Image from 'next/image'
import logo from '../assets/logo.svg'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { getErrorMessage } from '../utils/registerErrorMessages'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function login() {
  const { loginWithGoogle, login, error, setError } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(email, pass)
      Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Balance | Iniciar Sesión</title>
      </Head>
      <motion.main
        initial={{ scale: 0, rotate: 180 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="container mx-auto flex h-screen items-center justify-center"
      >
        <div className="flex min-w-[20rem] flex-col items-start gap-10 md:mb-24">
          <Image src={logo} alt="Balance logo" />
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-3">
              <label className="label">Email:</label>
              <input
                type="email"
                className="input w-80"
                placeholder="tucorreo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="label">Contraseña:</label>
              <input
                type="password"
                className="input w-80"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {error && <p className="text-red-600">{getErrorMessage(error)}</p>}
            <div className="flex flex-col items-start gap-5">
              <div className="flex gap-3">
                <button
                  className="button bg-primary-500 text-white shadow-lg hover:bg-primary-600"
                  type="submit"
                >
                  Ingresar
                </button>

                <button
                  className="button flex items-center gap-3 bg-gray-200 shadow-lg"
                  onClick={async (e) => {
                    await loginWithGoogle(e)
                    Router.push('/')
                  }}
                >
                  <FcGoogle />
                  Ingresar con Google
                </button>
              </div>

              <p className="self-start font-bold">
                No tienes cuenta?{' '}
                <Link href={'/register'}>
                  <span className="cursor-pointer text-primary-500 hover:text-primary-600">
                    Regístrate
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden flex-col items-center gap-3 md:inline-flex">
          <Image src={ilustration} alt="undraw-ilustration" />
          <p className="flex gap-1 text-xl font-bold">
            Desarrollado por
            <a
              className="flex cursor-pointer gap-1 text-primary-500 hover:text-primary-600"
              href="https://github.com/cfardev"
              target="_blank"
            >
              Carlos Arcia
              <AiFillGithub />
            </a>
          </p>
        </div>
      </motion.main>
    </>
  )
}
