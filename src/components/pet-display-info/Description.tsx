import { Typography, Link as MaterialLink } from "@mui/material";

import {decodeHtmlEntityString} from "../../utils/decodeHtmlEntity.ts";

type Props = {
  description: string | null;
  url: string;
};

export default function Description(props: Props) {
  const decodedDescription = decodeHtmlEntityString(props.description);

  return (
    <section>
      <Typography variant="h4">Description</Typography>
      <Typography variant="body1">{decodedDescription}</Typography>

      <MaterialLink href={props.url} target="_blank">
        More at PetFinder.com.
      </MaterialLink>
    </section>
  );
}
