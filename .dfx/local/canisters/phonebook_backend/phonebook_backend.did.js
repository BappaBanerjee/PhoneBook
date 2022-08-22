export const idlFactory = ({ IDL }) => {
  const Name = IDL.Text;
  const Phone = IDL.Text;
  const Entry = IDL.Record({ 'desc' : IDL.Text, 'phone' : Phone });
  return IDL.Service({
    'deleteContact' : IDL.Func([Name], [IDL.Opt(Entry)], []),
    'entries' : IDL.Func([], [IDL.Vec(IDL.Tuple(Name, Entry))], ['query']),
    'getSize' : IDL.Func([], [IDL.Nat], ['query']),
    'insert' : IDL.Func([Name, Entry], [IDL.Text], []),
    'lookup' : IDL.Func([Name], [IDL.Opt(Entry)], ['query']),
    'updateContact' : IDL.Func([Name, Entry], [IDL.Opt(Entry)], []),
  });
};
export const init = ({ IDL }) => { return []; };
