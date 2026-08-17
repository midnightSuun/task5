declare module '*.module.css' {
    const classes: Record<string, string>
    export default classes
}

declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const ReactComponent: FC<SVGProps<SVGSVGElement>>
    export default ReactComponent
}
