import T from 'i18n-react';
import translations from 'locales';
import { IUser } from 'modules/auth/types';
import * as moment from 'moment';
import * as React from 'react';

moment.defineLocale('mn', {
  relativeTime: {
    future: '%s',
    past: '%s',
    ss: '$dс',
    s: 'саяхан',
    m: 'м',
    mm: '%dм',
    h: '1ц',
    hh: '%dц',
    d: '1ө',
    dd: '%dө',
    M: '1с',
    MM: '%dс',
    y: '1ж',
    yy: '%dж'
  }
});

moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '%ds',
    ss: '%ds',
    m: 'm',
    mm: '%dm',
    h: 'h',
    hh: '%dh',
    d: 'd',
    dd: '%dd',
    M: 'm',
    MM: '%dm',
    y: 'y',
    yy: '%dy'
  }
});

interface IState {
  currentUser?: IUser;
  currentLanguage: string;
  isLoading: boolean;
  removingIndicator: React.ReactNode;
}

interface IStore extends IState {
  currentUser?: IUser;
  changeLanguage: (languageCode: string) => void;
  closeLoadingBar: () => void;
  showLoadingBar: () => void;
  setRemoveProgress: (removingIndicator: React.ReactNode) => void;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<
  { currentUser?: IUser },
  IState
> {
  constructor(props) {
    super(props);

    // initiliaze locale ======
    const currentLanguage = localStorage.getItem('currentLanguage') || 'en';

    this.state = {
      currentUser: props.currentUser,
      currentLanguage,
      isLoading: false,
      removingIndicator: null
    };

    this.setLocale(currentLanguage);
  }

  checkIsLoadingData = () => {
    const lastImport = localStorage.getItem('erxes_import_data');

    if (lastImport) {
      return this.setState({ isLoading: true });
    }

    return this.setState({ isLoading: false });
  };

  closeLoadingBar = () => {
    this.setState({ isLoading: false });

    localStorage.setItem('erxes_import_data', '');
  };

  showLoadingBar = () => {
    this.setState({ isLoading: true });
  };

  setRemoveProgress = (removingIndicator: React.ReactNode) => {
    this.setState({ removingIndicator });
  };

  componentDidMount() {
    this.checkIsLoadingData();
  }

  setLocale = (currentLanguage: string): void => {
    moment.locale(currentLanguage);
    T.setTexts(translations[currentLanguage]);
  };

  changeLanguage = (languageCode): void => {
    const currentLanguage = languageCode || 'en';

    localStorage.setItem('currentLanguage', currentLanguage);

    this.setLocale(currentLanguage);

    this.setState({ currentLanguage });
  };

  public render() {
    const {
      currentUser,
      currentLanguage,
      isLoading,
      removingIndicator
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          currentUser,
          currentLanguage,
          changeLanguage: this.changeLanguage,
          closeLoadingBar: this.closeLoadingBar,
          showLoadingBar: this.showLoadingBar,
          setRemoveProgress: this.setRemoveProgress,
          isLoading,
          removingIndicator
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
