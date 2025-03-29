import './App.css'
import {RouterProvider} from "react-router-dom";
import {AppRouter} from "@/config/router.tsx";
import {ConfigProvider, theme} from "antd";
import {useTheme} from "@/components/theme-provider.tsx";

function App() {
    const appTheme = useTheme();
    const {defaultAlgorithm, darkAlgorithm} = theme;
    return (
        <ConfigProvider
            theme={{
                algorithm: appTheme.theme === "light" ? defaultAlgorithm : darkAlgorithm,
                components: {
                    Select: {
                        hoverBorderColor: '',
                        activeBorderColor: 'var(--accent-foreground)',
                    },
                    DatePicker: {
                        hoverBorderColor: '',
                        activeBorderColor: 'var(--accent-foreground)',
                    },
                    Rate: {
                        starBg: 'gray',
                    }
                },
                token: {
                    colorTextPlaceholder: 'var(--muted-foreground)',
                }
            }}
        >
            <RouterProvider router={AppRouter}/>
        </ConfigProvider>
    )
}

export default App
