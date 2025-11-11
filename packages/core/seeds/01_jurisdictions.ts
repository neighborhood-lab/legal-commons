import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('jurisdictions').del()

  // Insert US states for business formation
  const jurisdictions = [
    {
      state: 'CA',
      state_name: 'California',
      county: null,
      filing_fees: {
        llc: 70,
        corporation: 100,
        dba: 40,
        nonprofit: 30,
      },
      requirements: {
        llc: {
          registered_agent: true,
          operating_agreement: true,
          annual_report: true,
          annual_fee: 800, // California Franchise Tax
        },
        corporation: {
          registered_agent: true,
          bylaws: true,
          annual_report: true,
          annual_fee: 800,
        },
      },
    },
    {
      state: 'NY',
      state_name: 'New York',
      county: null,
      filing_fees: {
        llc: 200,
        corporation: 125,
        dba: 25,
        nonprofit: 75,
      },
      requirements: {
        llc: {
          registered_agent: true,
          operating_agreement: true,
          publication: true, // NY-specific requirement
          annual_report: false,
        },
        corporation: {
          registered_agent: true,
          bylaws: true,
          annual_report: true,
        },
      },
    },
    {
      state: 'TX',
      state_name: 'Texas',
      county: null,
      filing_fees: {
        llc: 300,
        corporation: 300,
        dba: 25,
        nonprofit: 25,
      },
      requirements: {
        llc: {
          registered_agent: true,
          operating_agreement: false,
          annual_report: true,
        },
        corporation: {
          registered_agent: true,
          bylaws: true,
          annual_report: true,
        },
      },
    },
    {
      state: 'FL',
      state_name: 'Florida',
      county: null,
      filing_fees: {
        llc: 125,
        corporation: 70,
        dba: 50,
        nonprofit: 35,
      },
      requirements: {
        llc: {
          registered_agent: true,
          operating_agreement: false,
          annual_report: true,
          annual_fee: 138.75,
        },
        corporation: {
          registered_agent: true,
          bylaws: true,
          annual_report: true,
          annual_fee: 150,
        },
      },
    },
    {
      state: 'DE',
      state_name: 'Delaware',
      county: null,
      filing_fees: {
        llc: 90,
        corporation: 89,
        dba: 25,
        nonprofit: 89,
      },
      requirements: {
        llc: {
          registered_agent: true,
          operating_agreement: false,
          annual_report: true,
          annual_fee: 300,
        },
        corporation: {
          registered_agent: true,
          bylaws: true,
          annual_report: true,
          annual_fee: 50, // Minimum franchise tax
        },
      },
    },
  ]

  await knex('jurisdictions').insert(jurisdictions)
}
