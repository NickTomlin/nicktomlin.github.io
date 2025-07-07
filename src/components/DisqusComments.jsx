import { DiscussionEmbed } from 'disqus-react';

export default function DisqusComments({ shortname, config }) {
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={config}
    />
  );
}