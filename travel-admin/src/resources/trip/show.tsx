import React from 'react';
import { RichTextField, Show, ShowView, Tab, TabbedShowLayout, TextField } from 'react-admin';

const PostShow = (props: any) => (
  <Show {...props}>
    <ShowView {...props}>
      <TabbedShowLayout>
        <Tab label="post.form.summary">
          <TextField source="id" />
          <TextField source="title" />
        </Tab>
        <Tab label="post.form.body">
          <RichTextField
            source="description"
            stripTags={false}
            label=""
            addLabel={false}
          />
        </Tab>
      </TabbedShowLayout>
    </ShowView>
  </Show>
);
    
export default PostShow;