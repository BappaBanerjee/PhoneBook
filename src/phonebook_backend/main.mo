import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor {

  public type Name = Text;
  public type Phone = Text;

  public type Entry = {  
    desc: Text;
    phone: Phone;
  };

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);
  //Insert the data to the directory
  public func insert(name : Name, phone : Entry): async Text {
    phonebook.put(name, phone);
    return "Contact added successfull";
  };
  //search your contact into the directory
  public query func lookup(name : Name) : async ?Entry {
    phonebook.get(name)
  };

  //Read the whole directory at once
  public query func entries() : async [(Name , Entry)]{
      Iter.toArray<(Name, Entry)>(phonebook.entries());
  };
  //get the size of the directory
  public query func getSize() : async Nat{
    phonebook.size();
  };

  //update the contact in the directory
  public func updateContact(name : Name, phone : Entry) : async ?Entry{
    phonebook.replace(name , phone);
  };

  //delete contact
  public func deleteContact(name : Name) : async ?Entry{
    phonebook.remove(name);
  }
}