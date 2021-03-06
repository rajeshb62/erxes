import { __ } from 'modules/common/utils';
import { ICompany } from 'modules/companies/types';
import { CustomerAssociate } from 'modules/customers/containers';
import { PortableDeals } from 'modules/deals/containers';
import { Sidebar } from 'modules/layout/components';
import * as moment from 'moment';
import * as React from 'react';
import { List } from '../../styles';

export default class RightSidebar extends React.Component<{
  company: ICompany;
}> {
  renderPlan(company) {
    if (!company.plan) {
      return null;
    }

    return (
      <li>
        <div>{__('Plan')}: </div>
        <span>{company.plan}</span>
      </li>
    );
  }

  render() {
    const { company } = this.props;

    const { Section } = Sidebar;
    const { Title } = Section;

    return (
      <Sidebar>
        <CustomerAssociate data={company} />
        <PortableDeals companyId={company._id} />

        <Section>
          <Title>{__('Other')}</Title>
          <List>
            <li>
              <div>{__('Created at')}: </div>{' '}
              <span>{moment(company.createdAt).format('lll')}</span>
            </li>
            <li>
              <div>{__('Modified at')}: </div>{' '}
              <span>{moment(company.modifiedAt).format('lll')}</span>
            </li>
            {this.renderPlan(company)}
          </List>
        </Section>
      </Sidebar>
    );
  }
}
