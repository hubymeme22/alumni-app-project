<?php

/*
* TimedSession is a class created for generating a "dynamic token" that must be changed
* every n-seconds. The client is FORCED to change the token every n-seconds to generate a new token.
*
* The purpose of this is to prevent attacks similar to cookie stealing where attackers steals cookie
* for hijacking sessions.
*
* By: Hubert F. Espinola I
*/
class TimedSession {
	function __construct($id, $user, $pass, $salt, $interval=30) {
		// session details
		$this->id = $id;
		$this->user = $user;
		$this->pass = $pass;
		$this->salt = $salt;
		$this->interval = $interval;

		// session status
		$this->updated = false;
		$this->currentTime = time();

		// session token
		$this->token = hash_hmac('sha256', $this->id.$user.$pass, $salt);
	}

	// updates the last token
	function updateNode() {
		$this->id += 1;
		$this->updated = true;
		$this->currentTime = time();
		$this->token = hash_hmac('sha256', $this->id.$this->user.$this->pass.$this->token, $this->salt);
	}

	// only allow to get the hash if the session
	// is updated by time
	function getCurrentHash() {
		if (($this->currentTime + $this->interval) < time())
			return null;

		$this->updated = false;
		return $this->currentBlock->hash;
	}

	// validates if the token is valid and not expired
	function validateToken($token, $id) {
		if ($this->id == $id && $this->token == $token)
			return true;
		return false;
	}
}

?>