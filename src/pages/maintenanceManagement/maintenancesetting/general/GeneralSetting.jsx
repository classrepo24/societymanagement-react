import React from 'react'
import { useNavigate } from 'react-router-dom'
import {MaintenanceChargeConfigure} from "./MaintenanceChargeConfigure";
import { BillNumberSettings } from './BillNumberSettings';
import {BillingCycleSetting} from "./BillingCycleSetting";
import { LateFeeSettings } from './LateFeeSettings';
import {InterestSettings} from "./InterestSettings";
import {PaymentSettings} from "./PaymentSettings";
import {MaintenanceComponents} from "./MaintenanceComponents";
import { DuesCarryForwardSettings } from './DuesCarryForwardSettings';
import { Footer } from './Footer';

export const GeneralSetting = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[49.5%_49%] gap-5 m-4">
        <MaintenanceChargeConfigure />
        <BillingCycleSetting />
      </div>
      <div className="grid w-full lg:grid-cols-[35%_26%_35%] m-4 gap-5">
        <LateFeeSettings />
        <InterestSettings />
        <PaymentSettings />
      </div>
      <div className="grid w-full lg:grid-cols-[42%_26%_28%] m-4 gap-5">
        <MaintenanceComponents />
        <BillNumberSettings />
        <DuesCarryForwardSettings />
      </div>
      <Footer />
    </div>
  )
}
