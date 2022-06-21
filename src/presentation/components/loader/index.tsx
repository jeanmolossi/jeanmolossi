import { CgSpinner } from "react-icons/cg"
import * as S from './styles'

export const Loader = () => {
    return (
        <S.LoaderContainer>
            <div><CgSpinner color="white" /></div>
        </S.LoaderContainer>
    )
}
