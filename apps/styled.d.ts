import "styled-components";
import { ModeColorType } from "./src/constants/DefaultTheme";
// styled-components안에 들어있는 DefaultTheme 형식 지정해주기
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    border: string;
    card: string;
    divider: string;
    danger: string;
    text: string;
    brand: string;
    footer: string;
    cardHeader: string;
    subText: string;
    chatBackground: string;
    chatBubble: string;
    footerText: string;
    footerSubText: string;
    header: string;
    input: string;
    button: string;
    toolButton: string;
    chatSelfText: string;
    headerButtonHover: string;
    mentionText: string;
    boxShadow: string;
    brandHover: string;
    brandActive: string;
    danger: string;
    dangerHover: string;
    dangerActive: string;
  }
}
