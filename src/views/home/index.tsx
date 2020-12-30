import styled from '@emotion/styled';

import { Separator } from "../../components/styledComponents";

import logo from "../../logo.svg";

// #region Styles

const Header = styled.header`
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Logo = styled.img`
    height: 40vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        & {
          animation: App-logo-spin infinite 20s linear;
        }
    }

    @keyframes App-logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const Code = styled.code`
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

const Link = styled.a`
    color: #61dafb;
`;

// #endregion

const Home = () => {
    return (
        <div>
            <Header>
                <h1>OxyPomme</h1>
                <p>
                    Sous titre
                </p>
                <img src="https://avatars1.githubusercontent.com/u/34627360?s=460&v=4" alt="avatar" />
            </Header>
            <Separator />
            <Main>
                <Logo src={logo} alt="logo" />
                <p>
                    Edit <Code>src/App.tsx</Code> and save to reload.
                </p>
                <Link
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
            </Link>
            </Main>
        </div>
    );
}

export default Home;