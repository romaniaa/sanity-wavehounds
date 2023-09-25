import {Flex, Stack, Text, Box} from '@sanity/ui'

export function SlugInput(props) {
  const url = import.meta.env.SANITY_STUDIO_SITE_URL;
  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <Flex>
        <Box marginRight={1}>
          {/* <Text size={1} muted>
            {url}
            {props.slugPrefix}
          </Text> */}
        </Box>
        <Box flex={1}>
          <Text size={1} style={{ whiteSpace: "nowrap" }}>
            {props.value?.current || ""}
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
}