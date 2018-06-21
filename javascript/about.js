import React from "react";
import { render } from "react-dom";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const DEFAULT_ENDPOINT = "https://ntomlin-me-api.now.sh";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || DEFAULT_ENDPOINT
});

const myQuery = gql`
  {
    getResume {
      projects {
        name
        uri
      }
      contactInformation {
        github
      }
    }
  }
`;

// can the error state be hydrated with default data?

const renderStory = ({ loading, error, data }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  const {
    firstName,
    lastName,
    projects,
    contactInformation: { github }
  } = data.getResume;
  return (
    <div>
      <h1>HI</h1>
      <article>
        {projects.map((x, i) => (
          <p key={i}>
            {x.name} : {x.uri}
          </p>
        ))}
      </article>
    </div>
  );
};

const DeveloperStory = () => <Query query={myQuery}>{renderStory}</Query>;

// TODO error handling
render(
  <ApolloProvider client={client}>
    <DeveloperStory />
  </ApolloProvider>,
  document.getElementById("about-me")
);
