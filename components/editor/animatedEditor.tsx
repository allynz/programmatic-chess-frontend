
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

const AnimatedEditorWrapper = ({ fullCode }: any) => {
    return (
        <div
            style={{
                height: "20rem",
                width: "40rem",
                // WOHOOOO
                pointerEvents: "none"
            }}>
            <AnimatedEditor
                fullCode={`
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;
using pp = pair<pii, pii>;
using vpp = vector<pair<pii, pii>>;

// TODO: Can we use const here?
struct Coordinates {
    pii queen;
    pii king;
    pii opponentKing;
};

class Board {
    mutable Coordinates coordinates;
    mutable bool isGameOver = false;

    private:
    Board() {};

    public:
    Board(Board const&) = delete;
    //void operator = (Board const&) = delete;

    static Board& getInstance() {
        static Board INSTANCE;
        return INSTANCE;
    }

    pii getQueen() const {
        return coordinates.queen;
    }

    pii getKing() const {
        return coordinates.king;
    }

    pii getOpponentKing() const {
        return coordinates.opponentKing;
    }

    bool getGameOver() const {
        return this->isGameOver;
    }

    void setQueen(const pii queen) const {
        coordinates.queen = queen;
    }

    void setKing(const pii king) const {
        coordinates.king = king;
    }

    void setOpponentKing(const pii opponentKing) const {
        coordinates.opponentKing = opponentKing;
    }

    void setGameOver(const bool isGameOver) const {
        this->isGameOver = isGameOver;
    }
};

namespace BoardNamespace {
    namespace {
        const Board& board = Board::getInstance();
    }

    namespace Getters {
        pii queen() {
            return board.getQueen();
        }

        int qx() {
            return queen().first;
        }

        int qy() {
            return queen().second;
        }

        pii king() {
            return board.getKing();
        }

        int kx() {
            return king().first;
        }

        int ky() {
            return king().second;
        }

        pii bk() {
            return board.getOpponentKing();
        }

        int bkx() {
            return bk().first;
        }

        int bky() {
            return bk().second;
        }

        bool isGameOver() {
            return board.getGameOver();
        }
    }

    namespace Setters {
        void setQueen(const pii queen) {
            board.setQueen(queen); 
        }

        void setKing(const pii king) {
            board.setKing(king);
        }

        void setOpponentKing(const pii opponentKing) {
            board.setOpponentKing(opponentKing);
        }

        void setGameOver(const bool isGameOver) {
            board.setGameOver(isGameOver);
        }
    }
};

using namespace BoardNamespace::Getters;
using namespace BoardNamespace::Setters;

class CoordinateHelper {
    public:
    // static means stateless so keep it that way
    static pii getCoordinateFromSquare(const string square) {
        const int col = square[0] - 'a';
        const int row = 7 - (square[1] - '1');

        return make_pair(row, col);
    }

    static string getSquareFromCoordinate(const pii cord) {
        const char v1 = (8 - cord.first) + '0';
        const char v2 = 'a' + cord.second;

        const string res = string(1,v2) + string(1, v1);
        
        return res;
    }

    static bool isInBound(const pii cord) {
        return 
            cord.first >= 0 
            && cord.first <= 7 
            && cord.second >= 0 
            && cord.second <= 7;
    }

    static bool isCorner(const pii cord) {
        return 
            (cord.first == 0 || cord.first == 7)
            && 
            (cord.second == 0 || cord.second == 7);
    }
};

// Can make singleton also if needed
class Grader {
    public:
    Grader() {}

    void submit(
        const pii cordStart,
        const pii cordEnd
    ) const {
        if (!verifyAndAssign(cordStart, cordEnd)) return;
        submitMovement(cordStart, cordEnd);
        fetchKingMoveAndUpdateBoard();
    }

    private:
    bool verifyAndAssign(
        const pii cordStart,
        const pii cordEnd
    ) const {
        if (cordStart == cordEnd) return false;
        if (cordStart == queen()) {
            setQueen(cordEnd);
        } else if (cordStart == king()) {
            setKing(cordEnd);
        } else {
            assert(false);
            return false;
        }

        return true;
    }

    void submitMovement(
        const pii cordStart,
        const pii cordEnd
    ) const {
        const string 
            squareStart = CoordinateHelper::getSquareFromCoordinate(cordStart),
            squareEnd = CoordinateHelper::getSquareFromCoordinate(cordEnd);

        cout << squareStart << "-" << squareEnd << endl;
    }

    void fetchKingMoveAndUpdateBoard() const {
        string kingMove; cin >> kingMove;
        
        if (kingMove.size() == 5) {
            const string kingSquare = string(1, kingMove[3]) + string(1, kingMove[4]);
            setOpponentKing(
                CoordinateHelper::getCoordinateFromSquare(kingSquare)
            );
        } else {
            setGameOver(true);
        }
    }
};

namespace GraderNamespace {
    namespace {
        const Grader grader = Grader();
    }

    void submit(
        const pii a,
        const pii b
    ) {
        grader.submit(a, b);
    }
};

using namespace GraderNamespace;

// make a utility namespace if you want to for easier access
class Utility {
    public:
    static int sign(const int x) {
        if (x == 0) return 0;
        if (x > 0) return 1;
        if (x < 0) return -1;

        return 0;
    }

    static int distanceFromKing(
        const pii cord, 
        const pii king) {
        return max(
            abs(cord.second - king.second), 
            abs(cord.first - king.first));
    }

    static vector<pii> getCorners() {
        static const vector<int> cornerDirs = {0, 7};

        vector<pii> corners(0);
        for (auto x : cornerDirs) {
            for (auto y : cornerDirs) {
                corners.push_back({x, y});
            }
        }

        return corners;
    }
};

class QueenTraversal {
    static const vector<pii> dirs;

    public:
    static vector<pii> computeQueenNextCords(
        const pii q, 
        const pii k, 
        const pii bk) {
        vector<pii> res(0);

        for (pii dir: dirs) {
            for (int i = 1 ; i <= 8 ; i++) {
                const pii cord = {
                    q.first + i * dir.first,
                    q.second + i * dir.second
                };

                if (!CoordinateHelper::isInBound(cord)) break;
                if (k == cord) break;
                if (bk == cord) {
                    res.push_back(cord);
                    break;
                }

                res.push_back(cord);
            }
        }

        return res;
    }
};

const vector<pii> QueenTraversal::dirs = {
    {-1, 0},
    {1, 0},
    {0, 1},
    {0, -1},
    {1, -1},
    {1, 1},
    {-1, 1},
    {-1, -1}        
};

/**
    * Provides utility for running a function on a queen traversal
    **/ 
class QueenChecker {
    static const vector<pii> dirs;

    public:
    static vector<pii> computeQueenNextCords(
        const pii q, 
        const pii k, 
        const pii bk) {
        vector<pii> res(0);

        for (pii dir: dirs) {
            for (int i = 1 ; i <= 8 ; i++) {
                const pii cord = {
                    q.first + i * dir.first,
                    q.second + i * dir.second
                };

                if (!CoordinateHelper::isInBound(cord)) break;
                if (k == cord) break;
                if (bk == cord) {
                    res.push_back(cord);
                    break;
                }

                res.push_back(cord);
            }
        }

        return res;
    }
};

const vector<pii> QueenChecker::dirs = {
    {-1, 0},
    {1, 0},
    {0, 1},
    {0, -1},
    {1, -1},
    {1, 1},
    {-1, 1},
    {-1, -1}        
};

class StalemateChecker {
    public:
    static bool isStalemate(
        const pii q,
        const pii k,
        const pii bk
    ) {
        if (isOpponentKingInCheck(q, k, bk)) return false;

        for (int i = -1 ; i <= 1 ; i++) {
            for (int j = -1 ; j <= 1 ; j++) {
                const pii curr = {
                    bk.first + i,
                    bk.second + j
                };

                if (!CoordinateHelper::isInBound(curr)) continue;
                if (curr == bk) continue;
                // it's not in check so next cords cannot be of the q or k, so no need to check that
                if (!isOpponentKingInCheck(q, k, curr)) {
                    return false;
                }
            }
        }

        return true;
    }

    private:
    static bool isOpponentKingInCheck(
        const pii q,
        const pii k,
        const pii bk
    ) {
        if (Utility::distanceFromKing(k, bk) <= 1) return true;

        const vector<pii> queenNextCords = 
            QueenChecker::computeQueenNextCords(q, k, bk);
        if (find(
            queenNextCords.begin(), 
            queenNextCords.end(), bk) != queenNextCords.end()) return true;

        return false;
    }
};

/**
    * How to use: create a transformer object using current coordinates
    * Then transform, or reverse it based on the need
    * Remember to not change the context of the cords throughout use
    * 
    * Cannot use it in constructor of other classes as till then pieces aren't initialized so it will be all -1
    **/ 
class Transformer {
    mutable int numberOfRotations;

    public:
    Transformer() {}
    
    void setRotations(const Coordinates originalCoordinates) const {
        numberOfRotations = getRotations(originalCoordinates);
    }

    Coordinates getTransformedCords(
        const Coordinates origCords) const {
        Coordinates transformedCords = origCords;
        for (int i = 0 ; i < numberOfRotations; i++) {
            transformedCords = 
                rotateForwardOnce(transformedCords);
        }

        return transformedCords;
    }

    pii reverseTransformCord(
        const pii transformedCord
    ) const {
        pii reversedCord = transformedCord;
        for (int i = 0 ; i < 4-numberOfRotations; i++) {
            reversedCord = 
                rotateForwardOnce(reversedCord);
        }

        return reversedCord;
    }

    private:
    // king needs to be outside queen influence
    int getRotations(const Coordinates origCords) const {
        const auto isOpponentKingBoxedOnRIghtBottom = 
            [](const Coordinates coordinates) -> bool {
                const int
                    qx = coordinates.queen.first,
                    qy = coordinates.queen.second,
                    kx = coordinates.king.first,
                    bkx = coordinates.opponentKing.first,
                    bky = coordinates.opponentKing.second;

                return qx < bkx && qy < bky;
            };

        Coordinates coordinates = origCords;
        int rotations = 0;
        while(!isOpponentKingBoxedOnRIghtBottom(coordinates)) {
            coordinates = rotateForwardOnce(coordinates);
            rotations++;
        }

        return rotations;
    }

    static Coordinates rotateForwardOnce(
        const Coordinates coordinates) {
        return {
            rotateForwardOnce(coordinates.queen),
            rotateForwardOnce(coordinates.king),
            rotateForwardOnce(coordinates.opponentKing),
        };
    }

    // rotate forward
    static pii rotateForwardOnce(const pii cord) {
        const int col = 7 - cord.first;
        const int row = cord.second;

        return make_pair(row, col);
    }
};

class EdgeHelper {
    static const vpp ALL_EDGES;

    public:
    static vpp getEdges(const pii cord) {
        vpp res(0);
        for (pp edge: ALL_EDGES) {
            if (edgeContains(edge, cord)) {
                res.push_back(edge);
            }
        }

        return res;
    }

    static vpp getAdjacentEdges(const vpp currEdges) {
        vpp vv(0);
        for (pp edge: currEdges) {
            const pii 
                edgeStart = edge.first,
                edgeEnd = edge.second;
            
            if (edgeStart.first == edgeEnd.first) {
                vv.push_back({
                    {edgeStart.first-1, edgeStart.second},
                    {edgeEnd.first-1, edgeEnd.second}
                });
                vv.push_back({
                    {edgeStart.first+1, edgeStart.second},
                    {edgeEnd.first+1, edgeEnd.second}
                });
            } else {
                assert(edgeStart.second == edgeEnd.second);
                vv.push_back({
                    {edgeStart.first, edgeStart.second-1},
                    {edgeEnd.first, edgeEnd.second-1}
                });
                vv.push_back({
                    {edgeStart.first, edgeStart.second+1},
                    {edgeEnd.first, edgeEnd.second+1}
                });
            }
        }

        vpp res(0);
        for (pp edge: vv) {
            if (CoordinateHelper::isInBound(edge.first)
                && CoordinateHelper::isInBound(edge.second)) {
                res.push_back(edge);
            }
        }

        return res;
    }

    static bool edgeContains(
        const pp edge,
        const pii cord) {
        const pii
            edgeStart = edge.first,
            edgeEnd = edge.second;
        
        const bool edgeStartContains = 
            cord.first >= edgeStart.first 
            && cord.second >= edgeStart.second;
        const bool edgeEndContains = 
            cord.first <= edgeEnd.first
            && cord.second <= edgeEnd.second;
        
        return 
            edgeStartContains
            && edgeEndContains;
    }
};

const vpp EdgeHelper::ALL_EDGES = {
    {
        {0, 0},
        {0, 7}
    },
    {
        {0, 0},
        {7, 0}
    },
    {
        {0, 7},
        {7, 7}
    },
    {
        {7, 0},
        {7, 7}
    }
};

class QueenCornerPositioner {
    public:
    QueenCornerPositioner() {}

    void position() const {
        if (CoordinateHelper::isCorner(queen())) return;

        const vpp movesToCorner = computeMovesToCorner();
        assert(movesToCorner.size() > 0);
        cerr << "Moves to corner:\n";
        for (pp move: movesToCorner) {
            cerr << move.first.first << " " << move.first.second 
                << ".."
                << move.second.first << " " << move.second.second << "\n";
        }
        const pp validMoveToCorner = findAnyValidMove(movesToCorner);

        submit(queen(), validMoveToCorner.first);
        submit(queen(), validMoveToCorner.second);
    }

    private:
    // all moves with no checks, just rawMoves for an empty board
    vpp computeMovesToCorner() const {
        vpp res(0);

        const vector<int> cornerDirs = {0, 7};
        for (int xDir: cornerDirs) {
            for (int yDir : cornerDirs) {
                const pii corner = {xDir, yDir};
                const pp dir1 = {
                    {corner.first, queen().second},
                    corner
                };
                const pp dir2 = {
                    {queen().first, corner.second},
                    corner
                };

                res.insert(res.end(), {dir1, dir2});
            } 
        }

        return res;
    }

    // TODO: prove that this exists w/out stalemate
    pp findAnyValidMove(
        const vpp origMoves) const {
        // check if moves.first = queen or moves.second == queen etc.
        const auto filterValidEdgeTraversals = 
            [&](const vpp &moves) -> vpp {
                vpp res(0);
                for (auto move: moves) {
                    cerr << move.first.first << " " << move.first.second 
                        << ".."
                        << move.second.first << " " << move.second.second << "\n";
                    cerr << "Details:\n";
                    cerr << (Utility::distanceFromKing(move.first, bk()) > 1) << "\n";
                    cerr << isValidQueenTraversal(queen(), move.first) << "\n";
                    cerr << !StalemateChecker::isStalemate(move.first, king(), bk()) << "\n";

                    if (Utility::distanceFromKing(move.first, bk()) > 1
                        && isValidQueenTraversal(queen(), move.first)
                        && !StalemateChecker::isStalemate(move.first, king(), bk())) {
                        res.push_back(move);
                    }
                }

                return res;
            };
        const auto filterValidCornerTraversals = 
            [&](const vpp &moves) -> vpp {
                vpp res(0);
                // can omit the stalemate check, also the cords may be different for bk()
                for (pp move : moves) {
                    if (Utility::distanceFromKing(move.second, bk()) >= 3
                        && Utility::distanceFromKing(move.second, king()) >= 1
                        && isValidQueenTraversal(move.first, move.second)) {
                        res.push_back(move);
                    }
                }

                return res;
            };

        const vpp movesWithValidEdgeTraversal = 
            filterValidEdgeTraversals(origMoves);
        cerr << "Moves with valid edge:\n";
        for (pp move: movesWithValidEdgeTraversal) {
            cerr << move.first.first << " " << move.first.second 
                << ".."
                << move.second.first << " " << move.second.second << "\n";
        }
        const vpp movesWithValidCornerTraversal = 
            filterValidCornerTraversals(movesWithValidEdgeTraversal);

        assert(movesWithValidCornerTraversal.size() > 0);
        return movesWithValidCornerTraversal[0];
    }

    bool isValidQueenTraversal(
        const pii queen, 
        const pii cord) const {
        vector<pii> nextQueenCords = 
            QueenTraversal::computeQueenNextCords(queen, king(), bk());
        nextQueenCords.push_back(queen); // add own cord also as it is also a valid traversal only
        
        return 
            find(
                nextQueenCords.begin(), 
                nextQueenCords.end(), 
                cord) != nextQueenCords.end();
    }
};

class KingCornerPositioner {
    public:
    KingCornerPositioner() {}
    
    void position() const {
        // prove that all this is possible
        traverseToEdge();
        traverseToCorner();
    }

    private:
    void traverseToEdge() const {
        // king already in edge check
        if (king().first == 0 
            || king().first == 7 
            || king().second == 0
            || king().second == 7) {
            return;
        }

        const auto traverse = [](const pii target) -> void {
            while(king() != target) {
                submit(
                    king(), 
                    {
                        king().first + Utility::sign(target.first - king().first),
                        king().second + Utility::sign(target.second - king().second)
                    });
            }
        };

        vector<pii> edges = {
            {king().first, 0},
            {king().first, 7},
            {0, king().second},
            {7, king().second}  
        };
        // prove that atleast 1 will be present
        for (pii cord: edges) {
            if (Utility::distanceFromKing(cord, king()) 
                // = will work as I have the first move, it is necessary also
                <= Utility::distanceFromKing(cord, bk())) {
                traverse(cord);
                break;
            }
        }
    }

    void traverseToCorner() const {
        const vector<pii> corners = Utility::getCorners();

        if (find(corners.begin(), corners.end(), king()) != corners.end()) return;

        const auto traverse = [](const pii corner) {
            pii target = corner;
            if (queen() == corner) {
                target = {
                    corner.first + Utility::sign(king().first - corner.first),
                    corner.second + Utility::sign(king().second - corner.second)
                };
            }

            while(king() != target) {
                submit(
                    king(), 
                    {
                        king().first + Utility::sign(target.first - king().first),
                        king().second + Utility::sign(target.second - king().second)
                    });
            }

            if (queen() == corner) {
                const auto getNextForwardForQueen = []() -> pii {
                    const vector<int> dirs = {-1, 1};
                    for (auto x : dirs) {
                        for (auto y : dirs) {
                            const pii cord = {
                                queen().first + x, 
                                queen().second + y
                            };
                            if (CoordinateHelper::isInBound(cord)) {
                                return cord;
                            }
                        }
                    }

                    assert(false);
                };

                submit(
                    queen(), 
                    getNextForwardForQueen());
                submit(king(), corner);
            }
        };

        for (pii corner : corners) {
            if (corner.first == king().first 
                || corner.second == king().second) {
                if (Utility::distanceFromKing(corner, king()) 
                    <= Utility::distanceFromKing(corner, bk())) {
                    traverse(corner);
                    break;
                }
            }
        }
    }
};

class KingAndQueenCombiner {
    public:
    KingAndQueenCombiner() {}

    void combine() const {
        if (isCombined()) return;
        
        traverseNearKing();
        traverseToCornerOfKing();
    }

    private:
    bool isCombined() const {
        // king is in corner and queen is one step ahead of them
        if (CoordinateHelper::isCorner(king())) {
            if (qx() != kx() && qy() != ky()) {
                return 
                    Utility::distanceFromKing(queen(), king()) == 1;
            }
        }

        return false;
    }

    void traverseNearKing() const {
        if (Utility::distanceFromKing(queen(), king()) == 1) return;

        submit(
            queen(),
            {
                kx() + Utility::sign(qx() - kx()),
                ky() + Utility::sign(qy() - ky())
            });
    }

    void traverseToCornerOfKing() const {
        const auto getNextForwardForQueen = 
            []() -> pii {
                const vector<int> dirs = {-1, 1};
                for (auto x : dirs) {
                    for (auto y : dirs) {
                        const pii cord = {
                            king().first + x, 
                            king().second + y
                        };
                        if (CoordinateHelper::isInBound(cord)) {
                            return cord;
                        }
                    }
                }

                assert(false);
            };

        submit(queen(), getNextForwardForQueen());
    }
};

class CheckmatePositioner {
    const QueenCornerPositioner queenCornerPositioner;
    const KingCornerPositioner kingCornerPositioner;
    const KingAndQueenCombiner kingAndQueenCombiner;

    public:
    CheckmatePositioner() {}
    
    void position() const {
        queenCornerPositioner.position();
        kingCornerPositioner.position();
        kingAndQueenCombiner.combine();
    }
};

class FinalBlowProvider {

    public:
    FinalBlowProvider() {}
    
    void provide() const {
        cerr << "getting king to cmate square..\n";
        getKingToCheckmateSquare();
        cerr << "Cornering opponent king..\n";
        cornerOpponentKing();
        giveCheckmateWithQueen();
    }

    private:
    // also take care of the case where king is already on the 3rd rank
    void getKingToCheckmateSquare() const {
        const pp edge3 = getEdge3();
        const pii perpendicularDirection = getPerpendicularDirection();
        const pii parallelDirection = getParallelDirection();
        
        cerr << "Getting king to 3rd rank..\n";
        while(!EdgeHelper::edgeContains(edge3, king())) {
            submit(
                king(), {
                    kx() + perpendicularDirection.first,
                    ky() + perpendicularDirection.second
                });
        }

        cerr << "Getting king near op king...\n";
        // move horizontally to end of board
        // keep king on the same edge
        while(CoordinateHelper::isInBound({
                    kx() + parallelDirection.first,
                    ky() + parallelDirection.second
                })) {
            submit(
                king(), {
                    kx() + parallelDirection.first,
                    ky() + parallelDirection.second
                });
        }
    }

    void cornerOpponentKing() const {
        // TODO: combine with above
        const pii parallelDirection = getParallelDirection();

        while(!CoordinateHelper::isCorner(bk())) {
            // dangle king near the checkmate square itself
            if (Utility::distanceFromKing(queen(), bk()) > 2) {
                submit(
                    queen(), 
                    {
                        qx() + parallelDirection.first,
                        qy() + parallelDirection.second
                    });
            } else {
                submit(
                    king(),
                    {
                        kx() - parallelDirection.first,
                        ky() - parallelDirection.second
                    });
            }
        }
    }

    void giveCheckmateWithQueen() const {
        submit(
            queen(),
            {
                (bkx() + kx()) / 2,
                (bky() + ky()) / 2
            }
        );
    }

    pp getEdge3() const {
        const auto get3rdRankEdge = []() {
            const vpp queenEdges = 
                EdgeHelper::getAdjacentEdges(
                    EdgeHelper::getEdges(bk()));
            vpp queenEdges2(0);
            for (pp edge : queenEdges) {
                if (EdgeHelper::edgeContains(edge, queen())) {
                    queenEdges2.push_back(edge);
                }
            }
            const vpp possible3rdRankEdges = 
                EdgeHelper::getAdjacentEdges(queenEdges2);
                
            for (pp edge: possible3rdRankEdges) {
                if (!EdgeHelper::edgeContains(edge, bk())
                    && !EdgeHelper::edgeContains(edge, queen())) {
                    return edge; // hopefully only 1 is actually present
                }
            }

            assert(false);
        };

        return get3rdRankEdge();
    }

    pii getPerpendicularDirection() const {
        // get king to 3rd rank edge - there should be a straight path
        const pp edge3 = getEdge3();
        const pii perpendicularDirection = [&edge3]() -> pii {
                if (edge3.first.first == edge3.second.first) {
                    return {
                        Utility::sign(edge3.first.first - kx()),
                        0
                    };
                } else {
                    cerr << "Edge:" 
                        << edge3.first.first << " " << edge3.second.first << ".."
                        << edge3.first.second << " " << edge3.second.second;
                    assert(edge3.first.second == edge3.second.second);
                    return {
                        0,
                        Utility::sign(edge3.first.second - ky())
                    };
                }
        }();

        return perpendicularDirection;
    }

    pii getParallelDirection() const {
        const pp edge3 = getEdge3();
        const pii parallelDirection = [&edge3]() -> pii {
            if (edge3.first.first == edge3.second.first) {
                return {
                    0,
                    Utility::sign(bky() - qy())
                };
            } else {
                return {
                    Utility::sign(bkx() - qx()),
                    0
                };
            }
        }();

        return parallelDirection;
    }
};

class OpponentKingChecker {

    public:
    OpponentKingChecker() {}
    
    bool isBoxed() const {
        const vpp opponentKingEdges = EdgeHelper::getEdges(bk());
        const vpp adjacentEdges = EdgeHelper::getAdjacentEdges(opponentKingEdges);

        for (auto pp : adjacentEdges) {
            if (EdgeHelper::edgeContains(pp, queen())) {
                return true;
            }
        }

        return false;
    }
};

class ConstraintChecker {
    public:
    static bool check(
        const pii k
    ) {
        return  
            (k.first <= 4 && k.second <= 4);
    }
};

// TODO: Use transformed cords only
class RookAligner {
    const Transformer transformer;

    public:
    RookAligner() {}

    bool align() const {
        transformer.setRotations({queen(), king(), bk()});

        if (moveForwardRook()) {
            return true;
        } else {
            // TODO: See if we should move king if it isn't really possible later, or will it be fine?
            if (moveForwardKing()) {
                if (moveForwardRook()) {
                    return true;
                }
            }
        }

        return false;
    }

    private:
    // move forward while being aliged to the king
    bool moveForwardRook() const {
        const auto boxesOpponentKing = 
            [&](const pii q, 
                const pii nq, 
                const pii bk) -> bool 
            {
                const pii distanceFromQ = {
                    abs(bk.first - q.first),
                    abs(bk.second - q.second)
                };

                const pii distanceFromNQ = {
                    abs(bk.first - nq.first),
                    abs(bk.second - nq.second)
                };

                return 
                    bk.first > nq.first 
                    && bk.second > nq.second
                    && distanceFromNQ.first <= distanceFromQ.first
                    && distanceFromNQ.second <= distanceFromQ.second
                    && (
                        distanceFromNQ.first < distanceFromQ.first
                        || distanceFromNQ.second < distanceFromQ.second
                    );
            };

        static const vector<pii> dirs = {
            {+1, 0},
            {0, +1}
        };
        
        const Coordinates transformedCords = 
            transformer.getTransformedCords(
                {queen(), king(), bk()});
        const pii
            q = transformedCords.queen,
            k = transformedCords.king,
            bk = transformedCords.opponentKing;
        for (auto dir : dirs) {
            const pii curr = {
                q.first + dir.first, 
                q.second + dir.second
            };

            if (!CoordinateHelper::isInBound(curr)) continue;
            if (curr == k) continue;
            if (Utility::distanceFromKing(curr, k) != 1) continue;
            // if (!ConstrainChecker::check()) continue; // no constraints needed for queen
            if (!boxesOpponentKing(q, curr, bk)) continue;

            submit(
                queen(), 
                transformer.reverseTransformCord(curr));
            return true;
        }

        return false;
    }

    bool moveForwardKing() const {
        const Coordinates transformedCords = 
            transformer.getTransformedCords(
                {queen(), king(), bk()});
        const pii
            q = transformedCords.queen,
            k = transformedCords.king,
            bk = transformedCords.opponentKing;

        const pii curr = {
            k.first + 1,
            k.second + 1
        };

        if (!CoordinateHelper::isInBound(curr)) return false;
        if (curr == q) return false;
        if (Utility::distanceFromKing(q, curr) != 1) return false;
        if (!ConstraintChecker::check(curr)) return false;

        submit(
            king(), 
            transformer.reverseTransformCord(curr));
        return true;
    }
};

class KingToQueenAligner {
    const Transformer transformer;

    public:
    KingToQueenAligner() {}

    // you must move, you can't stay still, as queen has just made a move
    // if king can't align, that's fine, there is only 1 position for that though, when bk trapped in corner, and k and q nearest to it with contraint
    // if attached to queen, then queen is in diagonal
    // if not attached, then have to attach
    // align rook completely if possible, as in rook alignment, I won't have to align it myself
    void align() const {
        transformer.setRotations({queen(), king(), bk()});
        const Coordinates transformedCords = 
            transformer.getTransformedCords(
                {queen(), king(), bk()});

        const pii   
            q = transformedCords.queen,
            k = transformedCords.king,
            bk = transformedCords.opponentKing;

        for (int i = -1 ; i <= 1 ; i++) {
            for (int j = -1 ; j <= 1 ; j++) {
                const pii curr = {
                    k.first + i,
                    k.second + j
                };

                if (!CoordinateHelper::isInBound(curr)) continue;
                if (curr == q) continue;
                if (curr == k) continue; // TODO: or whatever I guess, can stay here also, check it
                if (Utility::distanceFromKing(q, curr) != 1) continue;
                if (!ConstraintChecker::check(curr)) continue;
                if (StalemateChecker::isStalemate(q, curr, bk)) continue;

                // atleast 1 cord should be same
                if (curr.first == q.first 
                    || curr.second == q.second) {
                    submit(
                        king(), 
                        transformer.reverseTransformCord(curr));
                    return; // two loops so return, as break will only break from first loop
                }
            }
        }
    }
};

class KnightAligner {
    const Transformer transformer;

    public:
    KnightAligner() {}

    void align() const {
        transformer.setRotations({queen(), king(), bk()});
        const Coordinates transformedCords = 
            transformer.getTransformedCords(
                {queen(), king(), bk()});
        const pii
            q = transformedCords.queen,
            k = transformedCords.king,
            bk = transformedCords.opponentKing;

        static const vector<pii> dirs = 
            {
                {-1, +1}, 
                {+1, -1}
            };
        
        for (auto dir : dirs) {
            const pii curr = {
                q.first + dir.first,
                q.second + dir.second
            };

            if (!CoordinateHelper::isInBound(curr)) continue;
            if (curr == k) continue;
            // under the assumption, that we use transformed cords only
            // dont have to check doesBoxOpponentKing here
            if (bk.first <= curr.first 
                || bk.second <= curr.second) continue;

            submit(
                queen(), 
                transformer.reverseTransformCord(curr));
            break;
        }
    }
};

class OpponentKingBoxer {
    const OpponentKingChecker opponentKingChecker;
    const RookAligner rookAligner;
    const KnightAligner knightAligner;
    const KingToQueenAligner kingToQueenAligner;

    public:
    OpponentKingBoxer() {}
    
    // box till 3 dist of corner from king
    // prob. use transformers also here
    // box king on the edge
    void box() const {
        const pii q, k, bk;

        while(!opponentKingChecker.isBoxed()) {
            kingToQueenAligner.align();

            const bool isRookAligned = rookAligner.align();

            if (!isRookAligned) {
                // use knight move of queen, (not necessarily boxed now, but at one time it will be) - will need to prove it
                // use king move separately if bk is not boxed
                knightAligner.align();
            }
        }
    }
};

class Checkmater {
    const OpponentKingBoxer opponentKingBoxer;
    const FinalBlowProvider finalBlowProvider;

    public:
    void checkmate() const {
        opponentKingBoxer.box();
        finalBlowProvider.provide();
    }
};

class Solver {
    const CheckmatePositioner checkmatePositioner;
    const Checkmater checkmater;

    public:
    Solver() {}

    void solve() const {
        input();
        runStrategy();
    }

    private:
    void runStrategy() const {
        checkmatePositioner.position();
        checkmater.checkmate();
    }

    void input() const {
        int queenCount = 0;
        for (int i = 0 ; i < 8 ; i++) {
            for (int j = 0 ; j < 8 ; j++) {
                string piece; cin >> piece;
                if (piece == "Q") {
                    setQueen({i, j});
                } else if (piece == "K") {
                    setKing({i, j});
                } else if (piece == "BK") {
                    setOpponentKing({i, j});
                }
            }
        }
    }
};

int main() {
    Solver().solve();
    return 0;
}`} />
        </div>
    );
}

const AnimatedEditor = ({ fullCode }: { fullCode: string }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    const [code, setCode] = useState("");

    useEffect(() => {
        let res: string = "";
        let idx = 0;

        const interval = setInterval(
            () => {
                if (idx < fullCode.length) {
                    res += fullCode.at(idx);
                    idx++;
                    //setCode(res);
                    // nice, this doesn't cause flicker: https://github.com/Microsoft/monaco-editor/issues/803 WOOHOOO!
                    editorRef.current?.getModel()?.applyEdits([
                        {
                            forceMoveMarkers: true,
                            range: {
                                startLineNumber: idx, // what what? this is needed?
                                endLineNumber: 10000,
                                startColumn: 1,
                                endColumn: 10000,
                            },
                            text: fullCode.at(idx) || null
                        }
                    ]);
                    //editorRef.current?.getModel()?.setValue(res);
                    editorRef.current?.revealLine(
                        editorRef.current
                            .getModel()?.getLineCount() || 0);
                } else {
                    idx = 0;
                    res = "";
                }
            },
            50
        );

        return () => clearInterval(interval);
    }, []);

    return (<>
        <Editor
            theme="vs-dark"
            options={{
                fontSize: 17,
                readOnly: true,
                scrollbar: {
                    // TODO: Stop any interaction, no scrolling
                    // seems not working for vscodeEditor, maybe it has a parent above?
                    //alwaysConsumeMouseWheel: true
                }
            }}
            language="cpp"
            loading={<Spinner animation={"border"} />}
            onMount={
                (editor, monaco) => {
                    // WOW!!! very cool, but do it inside here only, as outside it is causing some CSS error, test this also in multiple browsers
                    editor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        function () { });
                    editorRef.current = editor; // doesnt matter before or after addCommand, prob because change is in place
                }
            }
            value={code}
        />
    </>);
};

export default AnimatedEditorWrapper;