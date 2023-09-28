import { Typography } from "@mui/material";
import {decodeHtmlEntityString} from "../../utils/decodeHtmlEntity.ts";

type Props = {
  name: string;
};
export default function PageTitle(props: Props) {
  return <Typography variant="h2">{decodeHtmlEntityString(props.name)}</Typography>;
}
