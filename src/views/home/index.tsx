import styled from '@emotion/styled';

import logo from "../../logo.svg";

// #region Styles

const App = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 100vh;
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
        <App>
            <Header>
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
            </Header>
        </App>
    );
}

export default Home;