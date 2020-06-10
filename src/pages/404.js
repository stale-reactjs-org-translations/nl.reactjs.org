/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const PageNotFound = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Pagina Niet Gevonden</Header>
          <TitleAndMetaTags title="React - Pagina Niet Gevonden" />
          <div css={sharedStyles.markdown}>
            <p>We konden niet vinden waar je naar zocht.</p>
            <p>
              Neem alsjeblieft contact op met de eigenaar van de website die je
              doorstuurde naar de oorspronkelijke URL en laat ze weten dat hun
              link gebroken is.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default PageNotFound;
