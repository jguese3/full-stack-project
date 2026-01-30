import { useState } from "react";
import { User } from "../../assets/types/user";
import { Search } from "../search/Search";
import { UserDisplay } from "../common/term-list-display/TermListDisplay";

function Landing({
        terms,
        updateTerms
    }:
    {
        terms: Term[],
        updateTerms: React.Dispatch<React.SetStateAction<Term[]>>
    }) {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
      <>
          <header>
              <h1>Complexicon</h1>
              <span>Make complex terms simple to understand!</span>
          </header>
          <main>
              <section>
                  {/* invoking setSearchValue updates the state of the search */}
                  <Search  
                      searchValue={searchValue}
                      handleSearchChange={setSearchValue}
                  />
                  <TermListDisplay 
                      terms= {
                          searchValue.trim() 
                          ? terms.filter(t => {
                                  return t.title.toLowerCase().includes(
                                      searchValue.toLowerCase().trim()
                              )}
                          )
                          : []
                      }
                      updateTerms={updateTerms}
                  />
              </section>
          </main>
      </>
    );
}

export default Landing;