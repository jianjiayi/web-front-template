// @ts-nocheck
import React from 'react';
import initialState from '/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/.umi/plugin-initial-state/models/initialState';
import model0 from "/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/models/loginUseModel";
import model1 from "/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/user/login/models/index";
// @ts-ignore
import Dispatcher from '/Users/soho/HD/E/project/people/project/data-center/data-center-front/node_modules/@umijs/plugin-model/lib/helpers/dispatcher';
// @ts-ignore
import Executor from '/Users/soho/HD/E/project/people/project/data-center/data-center-front/node_modules/@umijs/plugin-model/lib/helpers/executor';
// @ts-ignore
import { UmiContext } from '/Users/soho/HD/E/project/people/project/data-center/data-center-front/node_modules/@umijs/plugin-model/lib/helpers/constant';

export const models = { '@@initialState': initialState, 'loginUseModel': model0, 'user.login.index': model1 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}
