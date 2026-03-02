// import { useEffect, useState } from "react";
// import type { User } from "../../types/user";
// import { UserListDisplay } from "../user-list-display/UserListDisplay";
// import { fetchUsers, followUser, unfollowUser } from "../../apis/usersRepository";

// export function Following() {
//   const [users, setUsers] = useState<User[]>([]);

//   // Load users on mount
//   useEffect(() => {
//     setUsers(fetchUsers());
//   }, []);

//   const handleFollowToggle = async (id: number) => {
//     const user = users.find(u => u.id === id);
//     if (!user) return;

//     if (user.isFollowing) {
//       await unfollowUser(id);
//     } else {
//       await followUser(id);
//     }

//     // Refresh from repo
//     setUsers(fetchUsers());
//   };

//   return (
//     <section className="friend-status">
//       <header>
//         <h2>Following</h2>
//       </header>

//       <main>
//         <UserListDisplay
//           users={users.filter(user => user.isFollowing)}
//           onFollowClick={handleFollowToggle}
//         />
//       </main>
//     </section>
//   );
// }

import { createPortal } from "react-dom";
import { useTerms } from "../../../hooks/useTerms";
import { Term } from "../../../types/term";
import PopupMessage from "../../common/popup-message/PopupMessage";
import { TermListDisplay } from "../../common/term-list-display/TermListDisplay";

/**
 * title: the title of the page
 * 
 * termDependencies: useTerms initially queries all terms. If the 
 *  termDependency value changes, it will re-query all terms and "refresh" the 
 *  terms in state.
 * 
 * termFilterFn: callback function passed to filter the terms that will appear
 *  on this page (null for all terms)
 */
type TermListPageProps = {
    title: string,
    termDependencies: any[],
    termFilterFn: ((term: Term) => boolean)|null
}

/** 
 * This "wrapper" component for Term Lists lets us reuse the popup and 
 * term-favourite behaviour for wrapped lists.
 */
export function TermListPage({title, termDependencies, termFilterFn}: TermListPageProps) {
    /**
     * These are custom hooks: functions that act like the useState hook, 
     *  but allow additional functionality.
     * 
     * useTerms makes a list of terms, a possible error message for getting/updating terms,
     *  and a function for toggling favourite terms available.
     * 
     * usePopup makes a boolean for the visibility of a popup, the text that should
     *  be on it, and a function for displaying that popup, available.
     */
    const { terms, error, toggleFavouriteTerm } = useTerms(termDependencies, termFilterFn);
    /**
     * Function passed down to TermLists and eventually TermCards; 
     * determines behaviour for clicking the "favourite" button.
     * @param id: the id of the term that was clicked
     */
    const handleSaveClick = async (id: number) => {
        await toggleFavouriteTerm(id);
    }

    return(
        <>
            <h2>{title}</h2>
            <div>
                    <TermListDisplay 
                        terms={terms} 
                        onSaveClick={ 
                            async (id: number) => {
                                await handleSaveClick(id);
                            }
                        } 
                    />
            </div>
        </>
    )
}



 