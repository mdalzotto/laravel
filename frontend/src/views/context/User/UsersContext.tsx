import {createContext, ReactNode, useState} from 'react'

type Props = {
    children?: ReactNode;
}

let initialValue = {
    nome: '',
    setNome: () => {},
    email: '',
    setEmail: () => {},
    situacao: '',
    setSituacao: () => {},
    dataAdmissao: '',
    setDataAdmissao: () => {},
    createdAt: null,
    setCreatedAt: () => {},
    updatedAt: null,
    setUpdatedAt: () => {},
}

const UsersContext = createContext<any>(initialValue)

const UsersProvider = ({children}: Props) => {

    const [nome, setNome] = useState(initialValue.nome);
    const [email, setEmail] = useState(initialValue.email);
    const [situacao, setSituacao] = useState(initialValue.situacao);
    const [dataAdmissao, setDataAdmissao] = useState(initialValue.dataAdmissao);
    const [createdAt, setCreatedAt] = useState(initialValue.createdAt as any);
    const [updatedAt, setUpdatedAt] = useState(initialValue.updatedAt as any);

    let dispatchUsesrsObject = {
        "name": nome,
        "email": email,
        "situacao": situacao,
        "data_admissao": dataAdmissao
    }

    const validateUserRegister = () => {
        if (!nome) {
            throw "Nome deve ser informado";
        }

        if (!email) {
            throw "E-mail deve ser informado";
        }

        if (situacao == "") {
            throw "Situação deve ser informada";
        }

        if (!dataAdmissao) {
            throw "Data Admissão deve ser informada";
        }
    }

    return (
     <>
        <UsersContext.Provider value={{
            nome, setNome,
            email, setEmail,
            situacao, setSituacao,
            dataAdmissao, setDataAdmissao,
            createdAt, setCreatedAt,
            updatedAt, setUpdatedAt,
            dispatchUsesrsObject,
            validateUserRegister
        }}>
            {children}
        </UsersContext.Provider>
     </>
    )
}

export { UsersContext, UsersProvider }