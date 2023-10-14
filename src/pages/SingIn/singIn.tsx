// import { Link, useNavigate } from "react-router-dom"
import style from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationLogin } from "./validationLogin"
import { toast } from "react-toastify"
import { Header } from "../../components/Header/Header"
import { Input } from "../../components/Input/Input"
import { useAdminContext } from "../../Providers/AdminContext"
import { useState } from "react"
export const SingIn = () => {
    const [loading, setLoading] = useState<boolean | undefined>()
    const { login }:any = useAdminContext(); 
    // const navi = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ValidationLogin),
    })

    const submit = async(dataForm: object) => {
        try {
            setLoading(true)
            await login(dataForm)
        } catch (error:any) {
          toast.warning(error.message)
        } finally {
          setLoading(false)
        }
    }

    const mapError = (error: any) => {
      if (typeof error === "string") {
        return { message: error };
      }
      if (error && error.message) {
        return error;
      }
      return undefined;
    };

    return (
        <div className={style.div}>
            <Header visible={false} />
            <main className={style.main}>
                <h1 className="title white">Login</h1>
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <Input
                                label="Nome"
                                type="text"
                                placeholder="Digite seu nome"
                                {...register("name")}
                                error={mapError(errors.name?.message)}
                            />
                            <Input
                                label="Senha"
                                type="password"
                                placeholder="Digite seu senha"
                                {...register("password")}
                                error={mapError(errors.password?.message)}
                            />
                            <button className="button">
                                {!loading ? "Entrar" : "Tentando conectar"}
                            </button>
                        </div>
                    </form>
                    <span className="title headline grey">
                        CADASTO DE MOTORISTAS
                    </span>
                </div>
            </main>
        </div>
    )
}