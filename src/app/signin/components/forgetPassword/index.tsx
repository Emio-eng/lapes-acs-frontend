import React, { useState } from 'react';

import { sucessToast } from '../../../../functions/sucessToast';
import { warnToast } from '../../../../functions/warnToast';
import { sendRecovey } from '../../../../services/auth';
import { checkEmail } from './functions/checkEmail';
import * as S from './styles';

interface ForgetPassWordInterface {
  closeModal: () => void;
}

export const ForgetPassForm = ({ closeModal }: ForgetPassWordInterface) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleChangeEmail = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(checkEmail(email));
  };

  const submitPassRecovery = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!emailError == true && email !== '') {
        const res = await sendRecovey(email);
        if (res.status === 204) {
          sucessToast(
            `Email de verificação enviado com sucesso!, verifique o email ${email}`
          );
          closePassModal(e);
        }
      } else {
        warnToast('Preencha corretamente o email!');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const closePassModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <S.Container>
      <S.Content>
        <S.InfoDiv>
          <S.Title>Esqueci a senha</S.Title>
          <S.Line />
          <S.SubTitle>
            Digite seu e-mail e você receberá um link para alterar sua senha
          </S.SubTitle>
        </S.InfoDiv>
        <S.InputDiv>
          <S.InputRequest
            placeholder="Email:"
            type="email"
            onChange={handleChangeEmail}
          />
          {emailError && (
            <S.ErrorMessage>*Digite um email de dominio da upe</S.ErrorMessage>
          )}
        </S.InputDiv>
        {/* <S.ReCAPTCHADiv></S.ReCAPTCHADiv> */}
        <S.ButtonDiv>
          <S.Button
            color="#fff"
            background="#1c3c78"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              submitPassRecovery(e)
            }
          >
            Recuperar senha
          </S.Button>
          <S.Button
            color="#1c3c78"
            background="#fff"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              closePassModal(e)
            }
          >
            Voltar
          </S.Button>
        </S.ButtonDiv>
      </S.Content>
    </S.Container>
  );
};
