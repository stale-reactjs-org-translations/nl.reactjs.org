/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {urlRoot} from 'site-constants';
import {sharedStyles} from 'theme';

import names from '../../content/acknowledgements.yml';

const Acknowlegements = ({data, location}) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Dankwoord</Header>
          <TitleAndMetaTags
            ogUrl={`${urlRoot}/acknowledgements.html`}
            title="React - Dankwoord"
          />

          <div css={sharedStyles.markdown}>
            <p>We willen graag al onze bijdragers bedanken:</p>

            <ul
              css={{
                display: 'flex',
                flexWrap: 'wrap',
              }}>
              {names.map((name, index) => (
                <li
                  css={{
                    flex: '1 0 200px',
                  }}
                  key={index}>
                  {name}
                </li>
              ))}
            </ul>

            <p>Daarnaast zijn we dank verschuldigd aan</p>
            <ul>
              <li>
                <a href="https://github.com/jeffbski">Jeff Barczewski</a> voor
                het mogen gebruiken van de{' '}
                <a href="https://www.npmjs.com/package/react">react</a> package
                naam op npm.
              </li>
              <li>
                <a href="https://christopheraue.net/">Christopher Aue</a> voor
                het gebruik van de{' '}
                <a href="https://reactjs.com/">reactjs.com</a> domeinnaam en de{' '}
                <a href="https://twitter.com/reactjs">@reactjs</a>{' '}
                gebruikersnaam op Twitter.
              </li>
              <li>
                <a href="https://github.com/ProjectMoon">ProjectMoon</a> voor
                het gebruik van de{' '}
                <a href="https://www.npmjs.com/package/flux">flux</a> package
                naam op npm.
              </li>
              <li>
                Shane Anderson voor het mogen gebruiken van de{' '}
                <a href="https://github.com/react">react</a> org op GitHub.
              </li>
              <li>
                <a href="https://github.com/voronianski">Dmitri Voronianski</a>{' '}
                voor het mogen gebruiken van het{' '}
                <a href="https://labs.voronianski.com/oceanic-next-color-scheme/">
                  Oceanic Next
                </a>{' '}
                kleurschema op deze website.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default Acknowlegements;
