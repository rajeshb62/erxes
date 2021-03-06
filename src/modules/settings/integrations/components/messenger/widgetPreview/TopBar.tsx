import { IUser } from 'modules/auth/types';
import { Icon } from 'modules/common/components';
import { __ } from 'modules/common/utils';
import { IBrand } from 'modules/settings/brands/types';
import { IMessagesItem } from 'modules/settings/integrations/types';
import * as moment from 'moment';
import * as React from 'react';
import { Supporters as SupporterComponent } from './';
import {
  ErxesGreeting,
  ErxesMiddleTitle,
  ErxesTopbar,
  GreetingInfo,
  Links,
  Socials,
  TopBarIcon
} from './styles';

type Props = {
  color: string;
  message?: IMessagesItem;
  wallpaper: string;
  supporterIds?: string[];
  isOnline: boolean;
  logoPreviewUrl?: string;
  brandId?: string;
  brands?: IBrand[];
  teamMembers: IUser[];
  isGreeting?: boolean;
  facebook?: string;
  twitter?: string;
  youtube?: string;
};

class TopBar extends React.Component<Props> {
  renderIcons(icon: string, left?: boolean, size?: number) {
    return (
      <TopBarIcon isLeft={left || false}>
        <Icon icon={icon} size={size} />
      </TopBarIcon>
    );
  }

  renderLink(value, icon) {
    if (!value) {
      return null;
    }

    return (
      <a>
        <Icon icon={icon} size={18} />
      </a>
    );
  }

  renderSupporters() {
    const { supporterIds, isOnline, teamMembers, isGreeting } = this.props;

    return (
      <SupporterComponent
        supporterIds={supporterIds}
        isOnline={isOnline}
        teamMembers={teamMembers}
        isGreeting={isGreeting}
      />
    );
  }

  renderTopBar() {
    const { brands = [], brandId } = this.props;
    let currentBrand = {} as IBrand;

    brands.map(brand => {
      if (brand._id !== brandId) {
        return null;
      }

      return (currentBrand = brand);
    });

    return (
      <>
        {this.renderIcons('leftarrow-3', true)}
        <ErxesMiddleTitle>
          {currentBrand && <h3>{currentBrand.name}</h3>}
          {currentBrand && <span>{currentBrand.description}</span>}
          {this.renderSupporters()}
        </ErxesMiddleTitle>
        {this.renderIcons('cancel', false, 11)}
      </>
    );
  }

  renderGreetingTitle(message) {
    if (message && message.greetings.title) {
      return <h3>{message.greetings.title}</h3>;
    }

    return <h3>{__('Welcome')}</h3>;
  }

  renderGreetingMessage(message) {
    if (message && message.greetings.message) {
      return <p>{message.greetings.message}</p>;
    }

    return (
      <p>
        {__('Hi, any questions?')} <br /> {__('We`re ready to help you.')}
      </p>
    );
  }

  renderGreetings() {
    const { message } = this.props;

    return (
      <GreetingInfo>
        {this.renderGreetingTitle(message)}
        {this.renderGreetingMessage(message)}
      </GreetingInfo>
    );
  }

  renderGreetingTopbar() {
    const { facebook, twitter, youtube } = this.props;

    return (
      <>
        <ErxesGreeting>
          <Links>
            <span>{moment(new Date()).format('lll')}</span>
            <Socials>
              {this.renderLink(facebook, 'facebook')}
              {this.renderLink(twitter, 'twitter')}
              {this.renderLink(youtube, 'youtube')}
            </Socials>
          </Links>

          {this.renderGreetings()}
          {this.renderSupporters()}
        </ErxesGreeting>
        {this.renderIcons('cancel', false, 11)}
      </>
    );
  }

  renderContent() {
    if (this.props.isGreeting) {
      return this.renderGreetingTopbar();
    }

    return this.renderTopBar();
  }

  render() {
    return (
      <ErxesTopbar style={{ backgroundColor: this.props.color }}>
        {this.renderContent()}
      </ErxesTopbar>
    );
  }
}

export default TopBar;
