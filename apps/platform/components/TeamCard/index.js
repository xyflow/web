import { Avatar, Center, Link, List, ListItem, Flex, Heading } from '@chakra-ui/react';

const TeamCardLink = (props) => (
  <Link isExternal color="pink.500" fontSize="lg" _hover={{ color: 'pink.700' }} {...props} />
);

function TeamCard({ name, image, github, twitter }) {
  return (
    <Flex
      borderWidth="1px"
      borderColor="grey:100"
      flexDir="column"
      alignItems="center"
      borderRadius="xl"
      bg="white"
      boxShadow="md"
      py={8}
    >
      <Center>
        <Avatar size="2xl" name={name} src={image} />
      </Center>
      <Heading mt="5" fontSize="24px" mb={2} align="center">
        {name}
      </Heading>

      <List mt="auto">
        <ListItem>
          <TeamCardLink href={github}>Github</TeamCardLink>
        </ListItem>
        {twitter && (
          <ListItem>
            <TeamCardLink href={twitter}>Twitter</TeamCardLink>
          </ListItem>
        )}
      </List>
    </Flex>
  );
}

export default TeamCard;
