import React from 'react'
import { Link } from 'react-router'
import './VoterItem.scss'
import VotingButton from 'components/VotingButton'
import { api } from 'services/fetch'

export const VoterItem = ({ voter, onVoting }) => (
    <div className="voter-item">
        <div className="voter-item-warp">
            <Link to={`/topic/voter/${voter.id}`}>
                <div className="headerimage">
                    <img src={`${api.imgHost}/180x180_w/${voter.faceDescription.image}`} />
                </div>
                <div className="desc-warp">
                    <p>{voter.number}.{voter.name}</p>
                    <p className="votes">{voter.numberOfVotes}票</p>
                </div>
            </Link>
            <VotingButton
                className="weui-btn_xf weui-btn_xf_mini"
                onVoting={onVoting}
                voterId={voter.id} />
        </div>
    </div>
)

VoterItem.propTypes = {
    voter: React.PropTypes.object.isRequired,
    onVoting: React.PropTypes.func.isRequired
}

export default VoterItem
