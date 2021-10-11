import React, { FC, useState } from 'react'
import { Layout, PageBlock, Input, Button, ToastProvider, ToastConsumer } from "vtex.styleguide";
import logo from './Images/LogoStyrk.png'



const merchantController: FC = () => {


  const [settingsLoading, setSettingsLoading] = useState(false)
  const [validateToken, setValidateToken] = useState(false)

  const [settingsState, setSettingsState] = useState({
    installToken: '',
    appKey: '',
    appToken: '',
    vtexURL: '',
    imageVtexURL: '',
    name: '',
    environmentName: '',
    country: ' ',
    evaluation: '',
    idMerchant: '',
    international: '',
    isPremium: '',
    rating: '',
    status: ''
  })

  const fetchToken = async (token: any, showToast: any)=> {
    setSettingsLoading(true)
    fetch(`https://services.styrk.io/catalog/styrk/api/merchant/validateinstalltoken?installToken=${token}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'omit',
      headers: { 'Content-type': 'application/json' },
    })
    .then((res) => res.json())
    .then((response)=>{
      const res = response.response;
      if(response.code === 200 && res.status === true){
        setSettingsState({
          ...settingsState,
          appKey: res.appKey,
          appToken: res.appToken,
          imageVtexURL: res.imageVtexURL,
          vtexURL: res.vtexURL,
          environmentName: res.environmentName,
          name: res.name,
          country: res.country,
          evaluation : res.evaluation,
          idMerchant: res.idMerchant,
          international: res.international,
          isPremium: res.isPremium,
          rating: res.rating,
          status: res.status
        })
        setValidateToken(true)
      }
      showToast(response.message)
      setSettingsLoading(false)
    })
    .catch((err) =>{
      showToast(err)
      setSettingsLoading(false)
    });
  }

  const updateData = async (idMerchant: any, showToast: any)=> {
    setSettingsLoading(true)
    fetch(`https://services.styrk.io/catalog/styrk/api/merchant/update?idMerchant=${idMerchant}`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(settingsState)
    })
    .then((res) => res.json())
    .then((response)=>{
      showToast(response.message)
      setSettingsLoading(false)
    })
    .catch((err) =>{
      console.log(err)
      showToast(err)
      setSettingsLoading(false)
    });
  }
  return (
    <ToastProvider positioning="window">
      <Layout>
        <section className="pt8 pl4">
          <img src={logo} alt="Styrk" />
        </section>
        <section className="pt7 pl4 pr4 ">
          <PageBlock
          variation="full"
          >
            <section className="pb4">
              <Input
                label="Styrk Token"
                value={settingsState.installToken}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    installToken: e.currentTarget.value,
                  })
                }
                token
              />
            </section>
            <section className="pb4">
              <Input
                label="App Key"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    appKey: e.currentTarget.value,
                  })
                }
                value={settingsState.appKey}
                appKey
              />
            </section>
            <section className="pb4">
              <Input
                label="App Token"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    appToken: e.currentTarget.value,
                  })
                }
                value={settingsState.appToken}
                appToken
              />
            </section>
            <section className="pb4">
              <Input
                label="VTEX URL"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    vtexURL: e.currentTarget.value,
                  })
                }
                value={settingsState.vtexURL}
                vtexURL
              />
            </section>
            <section className="pb4">
              <Input
                label="Image VTEX URL"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    imageVtexURL: e.currentTarget.value,
                  })
                }
                value={settingsState.imageVtexURL}
                imageVtexURL
              />
            </section>
            <section className="pb4">
              <Input
                label="Name"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    name: e.currentTarget.value,
                  })
                }
                value={settingsState.name}
                name
              />
            </section>
            <section className="pb4">
              <Input
                label="Environment Name"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSettingsState({
                    ...settingsState,
                    environmentName: e.currentTarget.value,
                  })
                }
                value={settingsState.environmentName}
                name
              />
            </section>
            <ToastConsumer>
              {
                ({ showToast } : any) => (
                  <section className="pt4">
                <Button
                  variation="primary"
                  onClick={() => {
                    !validateToken && fetchToken(settingsState.installToken, showToast) || updateData(settingsState.idMerchant, showToast)
                  }}
                  isLoading={settingsLoading}
                  disabled={
                    !settingsState.installToken
                  }
                >
                  {
                    validateToken && 'Actualizar' || 'Consultar'
                  }
                </Button>

              </section>
                )
              }
            </ToastConsumer>

          </PageBlock>
        </section>
      </Layout>
    </ToastProvider>
  )
}

export default merchantController
