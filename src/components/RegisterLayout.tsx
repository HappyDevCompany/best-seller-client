import { useMutation } from '@apollo/client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { REGISTER_MUTATION } from '../graphql/mutations'
import { login } from '../store/authSlice'

const RegisterLayout = () => {
    const [username, setUsername] = React.useState<any>()
    const [sex, setSex] = React.useState<any>('m')
    const [password, setPassword] = React.useState<any>()
    const [confirmPassword, setConfirmPassword] = React.useState<any>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerMutation, { loading, error, data }] = useMutation<any>(REGISTER_MUTATION);

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if(password === confirmPassword){
            registerMutation({ variables: { username, password, sex } }).then(res => {
            console.log('data : ', res.data)
            const user = res.data.register
            dispatch(login(user))
            navigate('/')
        }).catch(error => console.log(error))
        }else{
            alert("Les mots ne sont pas identiques !")
        }
        
    }

    return (
        <>
            <div className="text-lg font-semibold text-center text-white mb-5">INSCRIPTION</div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-between">
                <div className="">
                    <fieldset className="mb-5">
                        <label htmlFor="username" className="text-sm text-gray-200 mb-3">Nom d'utilisateur</label>
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="border border-gray-200 outline-none p-2 w-full rounded" />
                    </fieldset>
                    <fieldset className="mb-5">
                        <label htmlFor="sex" className="text-sm text-gray-200 mb-3">Sexe</label>
                        <select id="sex" value={sex} onChange={e => setSex(e.target.value)} className="border border-gray-200 outline-none p-2 w-full rounded" >
                            <option value="m">Homme</option>
                            <option value="f">Femme</option>
                        </select>
                    </fieldset>
                    <fieldset className="mb-5">
                        <label htmlFor="password" className="text-sm text-gray-200 mb-3">Mot de passe</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-200 outline-none p-2 w-full rounded" />
                    </fieldset>
                    <fieldset className="mb-5">
                        <label htmlFor="password" className="text-sm text-gray-200 mb-3">Confirmer le mot de passe</label>
                        <input type="password" id="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="border border-gray-200 outline-none p-2 w-full rounded" />
                    </fieldset>

                    {error?.message && !loading && <div className="bg-red-200 py-1 px-2 text-sm rounded-md mb-5">{error.message}</div>}
                    {!error && !loading && data?.register && <div className="bg-green-200 py-1 px-2 text-sm rounded-md mb-5">Compte a été créer avec success !</div>}

                </div>
                <button className="w-full outline-none  rounded bg-gray-700 hover:bg-gray-800 transition-colors text-white p-2">
                    {!loading ? <span>se connecter</span> :
                        <span>
                            loading...
                        </span>
                    }
                </button>
            </form>
        </>
    )
}

export default RegisterLayout