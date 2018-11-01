import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'

import FooterBadgeList from './components/FooterBadgeList'
import FooterLinksMatrix from './components/FooterLinksMatrix'
import FooterPaymentFormMatrix from './components/FooterPaymentFormMatrix'
import FooterVtexLogo from './components/FooterVtexLogo'
import FooterSocialNetworkList from './components/FooterSocialNetworkList'
import { objectLikeBadgeArray, objectLikeLinkArray } from './propTypes'

/**
 * Footer component that appears in the bottom of every page.
 * Can be configured by the pages editor.
 */
export default class Footer extends Component {
  static displayName = 'Footer'

  static propTypes = {
    /** Social Networks */
    socialNetworks: objectLikeLinkArray,
    /** Links Sections */
    sectionLinks: PropTypes.arrayOf(
      PropTypes.shape({
        /** Link section title */
        title: PropTypes.string.isRequired,
        /** Link  section links */
        links: objectLikeLinkArray,
      })
    ),
    /** Badges */
    badges: objectLikeBadgeArray,
    /** Payment Forms */
    paymentForms: PropTypes.arrayOf(
      PropTypes.shape({
        /** Payment Form title */
        title: PropTypes.string.isRequired,
        /** Payment Types */
        paymentTypes: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    /** Determines if the icons are colorful */
    showPaymentFormsInColor: PropTypes.bool,
    /** Determines if the icons are colorful */
    showSocialNetworksInColor: PropTypes.bool,
    /** Logo URL */
    logo: PropTypes.string,
    /** Store Informations */
    storeInformations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }

  static defaultProps = {
    showPaymentFormsInColor: false,
    showSocialNetworksInColor: false,
    socialNetworks: [
      {
        socialNetwork: 'Facebook',
        url: '#',
      },
    ],
    sectionLinks: [],
    badges: [],
    paymentForms: [
      {
        title: 'editor.footer.paymentForms.paymentForm',
        paymentTypes: ['MasterCard'],
      },
    ],
    storeInformations: [],
  }

  static schema = {
    title: 'editor.footer.title',
    description: 'editor.footer.description',
    type: 'object',
    properties: {
      logo: {
        type: 'string',
        title: 'editor.footer.logoUrl.title',
      },
      showPaymentFormsInColor: {
        type: 'boolean',
        title: 'editor.footer.showPaymentFormsInColor.title',
        default: false,
        isLayout: true,
      },
      showSocialNetworksInColor: {
        type: 'boolean',
        title: 'editor.footer.showSocialNetworksInColor.title',
        default: false,
        isLayout: true,
      },
      socialNetworks: {
        title: 'editor.footer.socialNetworks',
        type: 'array',
        minItems: 1,
        maxItems: 4,
        items: {
          title: 'editor.footer.socialNetworks.title',
          type: 'object',
          properties: {
            url: {
              title: 'editor.footer.socialNetworks.url.title',
              type: 'string',
            },
            socialNetwork: {
              title: 'editor.footer.socialNetworks.title',
              type: 'string',
              default: 'Facebook',
              enum: ['Facebook', 'Twitter', 'Instagram', 'Youtube'],
            },
          },
        },
      },
      sectionLinks: {
        title: 'editor.footer.linksSections',
        type: 'array',
        minItems: 0,
        maxItems: 5,
        items: {
          title: 'editor.footer.linksSections.linksSection',
          type: 'object',
          properties: {
            title: {
              title: 'editor.footer.linksSections.linksSection.title',
              type: 'string',
            },
            links: {
              title: 'editor.footer.linksSections.linksSection.links',
              type: 'array',
              minItems: 1,
              maxItems: 10,
              items: {
                title: 'editor.footer.linksSections.linksSection.links.link',
                type: 'object',
                properties: {
                  title: {
                    title:
                      'editor.footer.linksSections.linksSection.links.link.title',
                    type: 'string',
                  },
                  url: {
                    title:
                      'editor.footer.linksSections.linksSection.links.link.url',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      badges: {
        title: 'editor.footer.badge',
        type: 'array',
        items: {
          title: 'editor.footer.badge.title',
          type: 'object',
          properties: {
            image: {
              type: 'string',
              title: 'editor.footer.badge.image.title',
            },
          },
        },
      },
      paymentForms: {
        title: 'editor.footer.paymentForms',
        type: 'array',
        minItems: 1,
        maxItems: 5,
        items: {
          title: 'editor.footer.paymentForms.paymentForm',
          type: 'object',
          properties: {
            title: {
              title: 'editor.footer.paymentForms.paymentForm.title',
              type: 'string',
            },
            paymentTypes: {
              title: 'editor.footer.paymentForms.paymentForm.paymentTypes',
              type: 'array',
              minItems: 1,
              items: {
                title:
                  'editor.footer.paymentForms.paymentForm.paymentTypes.paymentType',
                type: 'string',
                default: 'MasterCard',
                enum: ['MasterCard', 'Visa', 'Diners Club'],
              },
            },
          },
        },
      },
      storeInformations: {
        title: 'editor.footer.storeInformations',
        type: 'array',
        minItems: 0,
        maxItems: 2,
        items: {
          title: 'editor.footer.storeInformations.storeInformation',
          type: 'object',
          properties: {
            storeInformation: {
              title: 'editor.footer.storeInformations.storeInformation',
              type: 'string',
              widget: {
                'ui:widget': 'textarea',
              },
            },
          },
        },
      },
    },
  }

  getInformationCssClasses = (listLength, index) => {
    let paddingClass
    const defaultClasses = 'vtex-footer__text-information w-100 w-50-ns pa3-ns f7 ma0'
    // Only apply vertical paddings if there is more than 1 element
    if (listLength > 1) {
      if (index === 0) {
        paddingClass = 'pb3-s'
      } else if (index + 1 === listLength) {
        paddingClass = 'pt3-s'
      } else {
        paddingClass = 'pv3-s'
      }
    }
    return classNames(defaultClasses, paddingClass)
  }

  render() {
    const {
      showPaymentFormsInColor,
      showSocialNetworksInColor,
      logo,
      sectionLinks,
      socialNetworks,
      paymentForms,
      badges,
      storeInformations,
    } = this.props

    return (
      <footer className="vtex-footer bt bw1 b--muted-4 mt4 pv5">
        <div className="vtex-footer__container center pt5-s flex justify-between ph4-s bg-white mid-gray">
          <div className="vtex-footer__links-container f6 w-100-s w-80-ns pb5-s">
            <FooterLinksMatrix links={sectionLinks} />
          </div>
          <div className="vtex-footer__social-networks-container pv5-s pa1-ns">
            <FooterSocialNetworkList
              titleId="social-networks"
              list={socialNetworks}
              horizontal
              alignRight
              titleCapitals
              showInColor={showSocialNetworksInColor}
            />
          </div>
        </div>
        <div className="vtex-footer__container center pv5-s flex justify-between ph4-s bg-white mid-gray">
          <FooterPaymentFormMatrix
            paymentForms={paymentForms}
            horizontal
            showInColor={showPaymentFormsInColor}
          />
        </div>
        <div className="vtex-footer__container center pt5-s flex justify-between bg-white mid-gray ph4-s">
          <div className="vtex-footer__text-container w-100-s pb5-s w-80-ns flex flex-wrap">
            {storeInformations &&
              storeInformations.map(({ storeInformation }, index) => (
                <p
                  key={`information-${index}`}
                  className={this.getInformationCssClasses(storeInformations.length, index)}
                >
                  {storeInformation}
                </p>
              ))}
          </div>
          <FooterVtexLogo logoUrl={logo} />
          <FooterBadgeList list={badges} />
        </div>
      </footer>
    )
  }
}
